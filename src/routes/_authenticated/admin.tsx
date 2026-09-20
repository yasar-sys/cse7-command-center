import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Image as ImageIcon, LogOut, Plus, RefreshCw, Save, Sparkles, Trash2, Upload } from "lucide-react";
import { generateMemberSummary } from "@/lib/member-summary.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { fetchSiteContentRows, siteContentQueryKey } from "@/hooks/use-site-content";
import { uploadSiteImage } from "@/lib/upload-image";
import {
  blankRecord,
  contentDefaults,
  contentKeys,
  contentLabels,
  mergeContent,
  type ContentKey,
} from "@/lib/site-content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Batch Control Panel | CSE 7th Batch" },
      { name: "description", content: "Private control panel for editing CSE 7th Batch members, memories, achievements and projects." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Batch Control Panel | CSE 7th Batch" },
      { property: "og:description", content: "Private control panel for editing CSE 7th Batch content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPanel,
});

type Row = Record<string, unknown>;

/** Extra optional fields the editor always offers, even when no record uses them yet. */
const extraFields: Partial<Record<ContentKey, string[]>> = {
  members: ["image", "role", "activities", "achievements", "summary", "highlights", "github", "linkedin", "portfolio"],
  achievements: ["image", "link"],
  projects: ["image", "github", "demo"],
};

/** Fields edited as one item per line instead of comma separated. */
const lineFields = new Set(["activities", "achievements", "highlights"]);

/** Fields that hold a picture. */
const imageFields = new Set(["image", "photo", "avatar"]);

function fieldNames(key: ContentKey, records: Row[]): string[] {
  const names = new Set<string>();
  const sample = (contentDefaults[key] as unknown as Row[] | Row);
  const defaults = Array.isArray(sample) ? sample : [sample];
  for (const record of [...defaults, ...records]) {
    if (record && typeof record === "object") Object.keys(record).forEach((name) => names.add(name));
  }
  (extraFields[key] ?? []).forEach((name) => names.add(name));
  return [...names];
}

function AdminPanel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [active, setActive] = useState<ContentKey>("members");
  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: siteContentQueryKey,
    queryFn: fetchSiteContentRows,
    retry: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user || cancelled) return;
      setEmail(user.email ?? null);
      const { data: roleRows } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      if (!cancelled) setIsAdmin(Boolean(roleRows?.length));
    })();
    return () => { cancelled = true; };
  }, []);

  const merged = useMemo(() => mergeContent(data), [data]);
  const current = (draft?.[active] ?? merged[active]) as unknown;

  function setSection(key: ContentKey, value: unknown) {
    setDraft((previous) => ({ ...(previous ?? {}), [key]: value }));
    setStatus(null);
  }

  async function saveSection(key: ContentKey) {
    setSaving(true);
    setError(null);
    setStatus(null);
    const value = (draft?.[key] ?? merged[key]) as unknown;
    const { error: saveError } = await supabase
      .from("site_content")
      .upsert({ key, data: value as never }, { onConflict: "key" });
    setSaving(false);
    if (saveError) { setError(saveError.message); return; }
    setDraft((previous) => {
      if (!previous) return previous;
      const next = { ...previous };
      delete next[key];
      return Object.keys(next).length ? next : null;
    });
    await queryClient.invalidateQueries({ queryKey: siteContentQueryKey });
    setStatus(`${contentLabels[key]} SAVED // LIVE ON THE SITE`);
  }

  async function resetSection(key: ContentKey) {
    setError(null);
    const { error: deleteError } = await supabase.from("site_content").delete().eq("key", key);
    if (deleteError) { setError(deleteError.message); return; }
    setDraft((previous) => {
      if (!previous) return previous;
      const next = { ...previous };
      delete next[key];
      return Object.keys(next).length ? next : null;
    });
    await queryClient.invalidateQueries({ queryKey: siteContentQueryKey });
    setStatus(`${contentLabels[key]} RESET TO THE ORIGINAL FILE CONTENT`);
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const dirty = Boolean(draft && draft[active] !== undefined);

  return (
    <main className="admin-shell">
      <div className="grid-plane" aria-hidden="true" />
      <header className="admin-head">
        <div>
          <p className="section-code">BATCH CONTROL PANEL // ADMIN</p>
          <h1>CONTENT COMMAND CENTER</h1>
          <p className="admin-user">{email ?? "…"} {isAdmin === false ? "// NO ADMIN ROLE" : isAdmin ? "// ADMIN VERIFIED" : ""}</p>
        </div>
        <div className="admin-head-actions">
          <Link to="/"><Button variant="hudOutline"><ArrowLeft aria-hidden="true" /> VIEW SITE</Button></Link>
          <Button variant="hudOutline" onClick={() => refetch()}><RefreshCw aria-hidden="true" /> RELOAD</Button>
          <Button variant="hud" onClick={signOut}><LogOut aria-hidden="true" /> SIGN OUT</Button>
        </div>
      </header>

      {isAdmin === false ? (
        <p className="auth-error" role="alert">
          This account is not an administrator, so saving is blocked. Sign in with the owner account (saminyasarsunny@gmail.com).
        </p>
      ) : null}

      <nav className="admin-tabs" aria-label="Content sections">
        {contentKeys.map((key) => (
          <Button key={key} variant={active === key ? "hud" : "hudOutline"} size="sm" onClick={() => { setActive(key); setStatus(null); setError(null); }}>
            {contentLabels[key]}{draft?.[key] !== undefined ? " *" : ""}
          </Button>
        ))}
      </nav>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>{contentLabels[active]}</h2>
          <div className="admin-panel-actions">
            <Button variant="hudOutline" size="sm" onClick={() => resetSection(active)}>RESET TO DEFAULT</Button>
            <Button variant="hud" size="sm" onClick={() => saveSection(active)} disabled={saving || isAdmin === false}>
              <Save aria-hidden="true" /> {saving ? "SAVING..." : dirty ? "SAVE CHANGES" : "SAVE"}
            </Button>
          </div>
        </div>
        {error ? <p className="auth-error" role="alert">{error}</p> : null}
        {status ? <p className="auth-message" role="status">{status}</p> : null}
        {isLoading ? <p className="admin-empty">LOADING RECORDS…</p> : null}

        {Array.isArray(current) ? (
          <ListEditor
            sectionKey={active}
            records={current as Row[]}
            onChange={(next) => setSection(active, next)}
          />
        ) : (
          <ObjectEditor
            record={(current ?? {}) as Row}
            onChange={(next) => setSection(active, next)}
          />
        )}
      </section>
    </main>
  );
}

function SummaryButton({ record, onChange }: { record: Row; onChange: (next: Row) => void }) {
  const generate = useServerFn(generateMemberSummary);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setFailure(null);
    try {
      const asList = (value: unknown) => (Array.isArray(value) ? value.map(String) : value ? [String(value)] : []);
      const result = await generate({
        data: {
          name: String(record.name ?? "").trim() || "Batch member",
          role: record.role ? String(record.role) : null,
          activities: asList(record.activities),
          achievements: asList(record.achievements),
          tone: "terminal" as const,
        },
      });
      onChange({ ...record, summary: result.summary, highlights: result.highlights });
    } catch (error) {
      setFailure(error instanceof Error ? error.message : "Could not write the summary. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-ai-row">
      <Button type="button" variant="hudOutline" size="sm" disabled={busy} onClick={run}>
        <Sparkles aria-hidden="true" /> {busy ? "WRITING…" : "WRITE SUMMARY WITH AI"}
      </Button>
      <small>Uses only the activities and achievements typed above.</small>
      {failure ? <small className="auth-error">{failure}</small> : null}
    </div>
  );
}

function ListEditor({ sectionKey, records, onChange }: { sectionKey: ContentKey; records: Row[]; onChange: (next: Row[]) => void }) {
  const fields = fieldNames(sectionKey, records);
  return (
    <div className="admin-records">
      {records.map((record, index) => (
        <article className="admin-record" key={index}>
          <header>
            <h3>RECORD {String(index + 1).padStart(2, "0")}</h3>
            <Button variant="hudOutline" size="sm" onClick={() => onChange(records.filter((_, i) => i !== index))} aria-label={`Delete record ${index + 1}`}>
              <Trash2 aria-hidden="true" /> DELETE
            </Button>
          </header>
          {sectionKey === "members" ? (
            <SummaryButton record={record} onChange={(next) => onChange(records.map((item, i) => (i === index ? next : item)))} />
          ) : null}
          <ObjectEditor
            record={record}
            fields={fields}
            onChange={(next) => onChange(records.map((item, i) => (i === index ? next : item)))}
          />
        </article>
      ))}
      <Button variant="hudOutline" onClick={() => onChange([...records, blankRecord(sectionKey)])}>
        <Plus aria-hidden="true" /> ADD RECORD
      </Button>
    </div>
  );
}

function ImageField({ field, value, onChange }: { field: string; value: string; onChange: (next: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setUploadError("Please choose an image file."); return; }
    setBusy(true);
    setUploadError(null);
    try {
      onChange(await uploadSiteImage(file));
    } catch (uploadFailure) {
      setUploadError(uploadFailure instanceof Error ? uploadFailure.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-field is-wide admin-image-field">
      <span>{field} (upload or paste a link)</span>
      <div
        className={`admin-dropzone ${dragging ? "is-dragging" : ""}`}
        onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => { event.preventDefault(); setDragging(false); handleFiles(event.dataTransfer.files); }}
      >
        {value ? <img src={value} alt="" className="admin-image-preview" /> : <ImageIcon aria-hidden="true" />}
        <div className="admin-dropzone-copy">
          <strong>{busy ? "UPLOADING…" : "DROP A PICTURE HERE"}</strong>
          <small>JPG or PNG, up to 10 MB</small>
          <div className="admin-dropzone-actions">
            <Button type="button" variant="hudOutline" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
              <Upload aria-hidden="true" /> CHOOSE FILE
            </Button>
            {value ? (
              <Button type="button" variant="hudOutline" size="sm" onClick={() => onChange("")}>REMOVE</Button>
            ) : null}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => { handleFiles(event.target.files); event.target.value = ""; }}
        />
      </div>
      <Input value={value} placeholder="/members/photo.jpg or https://…" onChange={(event) => onChange(event.target.value)} />
      {uploadError ? <small className="auth-error">{uploadError}</small> : null}
    </div>
  );
}

function ObjectEditor({ record, fields, onChange }: { record: Row; fields?: string[]; onChange: (next: Row) => void }) {
  const keys = fields ?? Object.keys(record);
  return (
    <div className="admin-fields">
      {keys.map((field) => {
        const value = record[field];
        const id = `${field}-${Math.abs(keys.join().length)}`;
        if (imageFields.has(field)) {
          return (
            <ImageField
              key={field}
              field={field}
              value={value == null ? "" : String(value)}
              onChange={(next) => onChange({ ...record, [field]: next })}
            />
          );
        }
        if (lineFields.has(field)) {
          const list = Array.isArray(value) ? value.map(String) : value ? [String(value)] : [];
          return (
            <label className="admin-field is-wide" key={field} htmlFor={id}>
              <span>{field} (one per line)</span>
              <Textarea
                id={id}
                rows={4}
                value={list.join("\n")}
                onChange={(event) => onChange({ ...record, [field]: event.target.value.split("\n").map((part) => part.trim()).filter(Boolean) })}
              />
            </label>
          );
        }
        if (typeof value === "boolean") {
          return (
            <label className="admin-field admin-field-check" key={field}>
              <input type="checkbox" checked={value} onChange={(e) => onChange({ ...record, [field]: e.target.checked })} />
              <span>{field}</span>
            </label>
          );
        }
        if (Array.isArray(value)) {
          return (
            <label className="admin-field" key={field} htmlFor={id}>
              <span>{field} (comma separated)</span>
              <Input id={id} value={value.join(", ")} onChange={(e) => onChange({ ...record, [field]: e.target.value.split(",").map((part) => part.trim()).filter(Boolean) })} />
            </label>
          );
        }
        const text = value == null ? "" : String(value);
        const long = field === "description" || field === "quote" || field === "caption";
        return (
          <label className={`admin-field ${long ? "is-wide" : ""}`} key={field} htmlFor={id}>
            <span>{field}</span>
            {long ? (
              <Textarea id={id} value={text} rows={3} onChange={(e) => onChange({ ...record, [field]: e.target.value })} />
            ) : (
              <Input id={id} value={text} onChange={(e) => onChange({ ...record, [field]: e.target.value })} />
            )}
          </label>
        );
      })}
    </div>
  );
}
