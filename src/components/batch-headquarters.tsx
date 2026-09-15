import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  AtSign,
  ChevronRight,
  Github,
  Image as ImageIcon,
  Linkedin,
  Mail,
  Menu,
  Search,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { achievements, memories, projects, quotes, siteDetails, stats, timeline } from "@/data/content";
import { members, type Member } from "@/data/members";

const navItems = ["HOME", "ABOUT", "MEMBERS", "ACHIEVEMENTS", "MEMORIES", "CONTACT"];
const memoryFilters = ["ALL", "CAMPUS", "EVENTS", "TOURS", "PROJECTS", "COMPETITIONS", "RANDOM MOMENTS"];

function scrollTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

function Eyebrow({ children }: { children: string }) {
  return <p className="hud-eyebrow"><span className="status-dot" />{children}</p>;
}

function SectionHeading({ code, title, copy }: { code: string; title: string; copy?: string }) {
  return (
    <div className="section-heading reveal">
      <p className="section-code">{code}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function PlaceholderImage({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`placeholder-image ${className}`} role="img" aria-label={label}>
      <ImageIcon aria-hidden="true" />
      <span>IMAGE // REPLACE</span>
    </div>
  );
}

function SmartImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <PlaceholderImage label={`${alt} placeholder`} className={className} />;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${compact ? "is-compact" : ""}`}>
      <button className="brand-mark" onClick={() => scrollTo("home")} aria-label="Return to home">
        <img src="/batch-logo.png" alt="CSE 7th Batch logo" className="brand-logo" />
        <span>CSE</span><i>//</i><strong>07</strong>
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}</button>)}
      </nav>
      <div className="nav-status"><span className="status-dot" />BATCH ONLINE</div>
      <Button variant="ghost" size="icon" className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </Button>
      {open ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <button key={item} onClick={() => { scrollTo(item); setOpen(false); }}>
              <span>0{index + 1}</span>{item}<ChevronRight aria-hidden="true" />
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="grid-plane" aria-hidden="true" />
      <div className="hero-particles" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
      <div className="hero-coordinates" aria-hidden="true">35.6762° N / 139.6503° E<br />0x07F2 // 01110011</div>
      <div className="hero-content">
        <Eyebrow>SYSTEM ONLINE // CSE-07</Eyebrow>
        <p className="hero-kicker">WE CODE. WE CREATE. WE CONNECT.</p>
        <img src="/batch-logo-hero.png" alt="CSE 7th Batch logo" className="hero-batch-logo" />
        <h1>CSE <span>7TH</span><br />BATCH</h1>
        <p className="hero-copy">One batch. Hundreds of stories. Infinite possibilities.</p>
        <div className="hero-actions">
          <Button variant="hud" size="lg" onClick={() => scrollTo("about")}>ENTER THE BATCH <ArrowDown /></Button>
          <Button variant="hudOutline" size="lg" onClick={() => scrollTo("members")}>EXPLORE MEMBERS <ArrowUpRight /></Button>
        </div>
      </div>
      <aside className="status-panel" aria-label="Batch system status">
        <div className="status-panel-head"><span>SYSTEM DIAGNOSTICS</span><b>LIVE</b></div>
        <dl>
          <div><dt>BATCH STATUS</dt><dd>ACTIVE</dd></div>
          <div><dt>DEPARTMENT</dt><dd>COMPUTER SCIENCE &amp; ENGINEERING</dd></div>
          <div><dt>BATCH</dt><dd>07</dd></div>
          <div><dt>SYSTEM</dt><dd>ONLINE</dd></div>
        </dl>
      </aside>
      <p className="hero-command"><Terminal /> ./initialize_batch.sh <span>READY</span></p>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-shell about-section">
      <SectionHeading code="01 // BATCH PROFILE" title="THE ARCHITECTURE OF US" />
      <div className="about-grid reveal">
        <div className="about-copy">
          <p className="placeholder-badge">EDITABLE INTRODUCTION</p>
          <p>CSE 7th Batch is a shared system of builders, thinkers, friends, and future-makers. Replace this introduction with the batch’s real story, values, and collective identity.</p>
          <div className="code-line"><span>root@cse07:~$</span> ./connect_members <b>[ READY ]</b></div>
        </div>
        <div className="batch-index"><span>GENERATION</span><strong>07</strong><small>BATCH // ACTIVE NODE</small></div>
      </div>
      <div className="stats-grid reveal">
        {stats.map((stat, index) => <div className="stat-cell" key={stat.label}><span>0{index + 1}</span><strong>{stat.value}</strong><p>{stat.label}</p><small>REPLACE VALUE</small></div>)}
      </div>
    </section>
  );
}

function MemberAvatar({ member, large = false }: { member: Member; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`member-avatar fallback ${large ? "large" : ""}`} role="img" aria-label={`Default avatar for ${member.name}`}><span>{member.name.slice(0, 2)}</span><ShieldCheck /></div>;
  return <img className={`member-avatar ${large ? "large" : ""}`} src={member.image} alt={`${member.name} profile`} loading="lazy" onError={() => setFailed(true)} />;
}

function MemberProfile({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <DialogContent className="identity-modal">
      <DialogTitle className="sr-only">{member.name} profile</DialogTitle>
      <DialogDescription className="sr-only">Identity record for batch member {member.name}</DialogDescription>
      <div className="identity-modal-grid">
        <div className="identity-photo"><MemberAvatar member={member} large /><span>IDENTITY VERIFIED</span></div>
        <div className="identity-record">
          <p className="section-code">IDENTITY RECORD // ACTIVE</p>
          <h3>{member.name}</h3>
          <p className="node-id">CSE // {member.roll.replace("CSE-", "")}</p>
          {member.isPlaceholder ? <p className="placeholder-badge">PLACEHOLDER RECORD</p> : null}
          <dl>
            <div><dt>ROLL NUMBER</dt><dd>{member.roll}</dd></div>
            <div><dt>REGISTRATION</dt><dd>{member.registration}</dd></div>
            <div><dt>STUDENT ID</dt><dd>{member.studentId}</dd></div>
            <div><dt>GMAIL</dt><dd><a href={`mailto:${member.email}`}>{member.email}</a></dd></div>
            {member.role ? <div><dt>ROLE</dt><dd>{member.role}</dd></div> : null}
          </dl>
          <div className="social-row">
            {member.github ? <a href={member.github} target="_blank" rel="noreferrer"><Github /> GitHub</a> : null}
            {member.linkedin ? <a href={member.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a> : null}
            {member.portfolio ? <a href={member.portfolio} target="_blank" rel="noreferrer"><ArrowUpRight /> Portfolio</a> : null}
          </div>
          <Button variant="hudOutline" onClick={onClose}>BACK TO BATCH</Button>
        </div>
      </div>
    </DialogContent>
  );
}

function Members() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("az");
  const [role, setRole] = useState("all");
  const [selected, setSelected] = useState<Member | null>(null);
  const roles = useMemo(() => [...new Set(members.map((member) => member.role).filter(Boolean))], []);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = members.filter((member) => {
      const matchesText = [member.name, member.roll, member.registration, member.studentId, member.email].some((value) => value.toLowerCase().includes(normalized));
      return matchesText && (role === "all" || member.role === role);
    });
    return [...filtered].sort((a, b) => {
      if (sort === "za") return b.name.localeCompare(a.name);
      if (sort === "rollAsc") return a.roll.localeCompare(b.roll);
      if (sort === "rollDesc") return b.roll.localeCompare(a.roll);
      return a.name.localeCompare(b.name);
    });
  }, [query, role, sort]);

  return (
    <section id="members" className="section-shell members-section">
      <SectionHeading code="02 // PERSONNEL DATABASE" title="THE CREW" copy="Every node has a story." />
      <div className="directory-console reveal">
        <div className="search-box"><Search aria-hidden="true" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="SEARCH BATCH DATABASE..." aria-label="Search members" /></div>
        <Select value={role} onValueChange={setRole}><SelectTrigger aria-label="Filter by role"><SelectValue placeholder="ALL ROLES" /></SelectTrigger><SelectContent><SelectItem value="all">ALL ROLES</SelectItem>{roles.map((item) => item ? <SelectItem key={item} value={item}>{item}</SelectItem> : null)}</SelectContent></Select>
        <Select value={sort} onValueChange={setSort}><SelectTrigger aria-label="Sort members"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="az">A → Z</SelectItem><SelectItem value="za">Z → A</SelectItem><SelectItem value="rollAsc">ROLL ASC</SelectItem><SelectItem value="rollDesc">ROLL DESC</SelectItem></SelectContent></Select>
        <p className="result-count"><span>{String(results.length).padStart(3, "0")}</span> NODES FOUND</p>
      </div>
      <div className="member-grid">
        {results.map((member, index) => (
          <article className="member-card reveal" key={`${member.name}-${index}`}>
            <div className="card-scan"><MemberAvatar member={member} /><span>IDENTITY VERIFIED</span></div>
            <div className="member-card-body">
              <p className="node-id">CSE // {member.roll.replace("CSE-", "")}</p>
              <h3>{member.name}</h3>
              {member.isPlaceholder ? <span className="placeholder-badge">PLACEHOLDER</span> : null}
              <dl><div><dt>ROLL</dt><dd>{member.roll}</dd></div><div><dt>REG</dt><dd>{member.registration}</dd></div><div><dt>ID</dt><dd>{member.studentId}</dd></div></dl>
              <a className="member-email" href={`mailto:${member.email}`}><AtSign />{member.email}</a>
              <Button variant="hudOutline" onClick={() => setSelected(member)}>VIEW PROFILE <ArrowUpRight /></Button>
            </div>
          </article>
        ))}
      </div>
      {!results.length ? <div className="empty-state"><Terminal /><h3>NO NODES FOUND</h3><p>Adjust the search or filter parameters.</p></div> : null}
      <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}>{selected ? <MemberProfile member={selected} onClose={() => setSelected(null)} /> : null}</Dialog>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="section-shell mission-section">
      <SectionHeading code="03 // VERIFIED OUTPUT" title="MISSION LOG" copy="Milestones, signals, and achievements will be recorded here." />
      <div className="mission-log">
        {achievements.map((item, index) => <article className="mission-entry reveal" key={index}><div className="timeline-node">0{index + 1}</div><div className="mission-year">{item.year}</div><div><span className="placeholder-badge">PLACEHOLDER ENTRY</span><h3>{item.title}</h3><h4>{item.studentOrTeam}</h4><p>{item.description}</p>{item.link ? <a href={item.link}>OPEN RECORD <ArrowUpRight /></a> : null}</div></article>)}
      </div>
    </section>
  );
}

function Memories() {
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState<(typeof memories)[number] | null>(null);
  const visible = filter === "ALL" ? memories : memories.filter((item) => item.category === filter);
  return (
    <section id="memories" className="section-shell memories-section">
      <SectionHeading code="04 // VISUAL ARCHIVE" title="MEMORY CORE" copy="Moments that became part of the system." />
      <div className="filter-row reveal">{memoryFilters.map((item) => <Button key={item} variant={filter === item ? "hud" : "hudOutline"} size="sm" onClick={() => setFilter(item)}>{item}</Button>)}</div>
      <div className="memory-grid">
        {visible.map((memory, index) => <button className="memory-tile reveal" key={`${memory.image}-${index}`} onClick={() => setSelected(memory)} aria-label={`Open ${memory.caption}`}><SmartImage src={memory.image} alt={memory.alt} /><span><small>{memory.category} // {memory.date ?? "DATE — REPLACE"}</small><strong>{memory.caption}</strong><em>{memory.event}</em></span></button>)}
      </div>
      <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}>{selected ? <DialogContent className="lightbox"><DialogTitle>{selected.caption}</DialogTitle><DialogDescription>{selected.event} // {selected.category}</DialogDescription><SmartImage src={selected.image} alt={selected.alt} /></DialogContent> : null}</Dialog>
    </section>
  );
}

function TimelineAndProjects() {
  return (
    <>
      <section className="section-shell batch-timeline">
        <SectionHeading code="05 // TEMPORAL RECORD" title="OUR TIMELINE" />
        <div className="timeline-track">{timeline.map((item, index) => <article className="timeline-card reveal" key={index}><span>{item.marker}</span><i /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </section>
      <section className="section-shell build-section">
        <SectionHeading code="06 // CREATION PROTOCOL" title="BUILD LAB" copy="Ideas compiled into working systems." />
        <div className="project-grid">{projects.map((project, index) => <article className="project-card reveal" key={index}><div className="project-visual"><span>0{index + 1}</span><Terminal /></div><div><p className="section-code">PROJECT // PLACEHOLDER</p><h3>{project.name}</h3><h4>BY {project.creator}</h4><p>{project.description}</p><div className="tech-row">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.github || project.demo ? <div className="project-links">{project.github ? <a href={project.github}>GITHUB</a> : null}{project.demo ? <a href={project.demo}>LIVE DEMO</a> : null}</div> : null}</div></article>)}</div>
      </section>
    </>
  );
}

function BatchWall() {
  return <section className="wall-section"><div className="section-shell"><SectionHeading code="07 // OPEN CHANNEL" title="THE BATCH WALL" /><div className="quotes-grid">{quotes.map((item, index) => <blockquote className="quote-card reveal" key={index}><span>“</span><p>{item.quote}</p><footer>— {item.author}</footer></blockquote>)}</div></div></section>;
}

function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-grid">
        <div><p className="section-code">CONNECTION // OPEN</p><h2>CSE <span>//</span> 07</h2><p>Connected by code. Defined by memories.</p></div>
        <div className="footer-institution">
          <img src="/college-logo.png" alt="Mymensingh Engineering College logo" className="college-logo" />
          <dl><div><dt>DEPARTMENT</dt><dd>{siteDetails.department}</dd></div><div><dt>BATCH</dt><dd>{siteDetails.batch}</dd></div><div><dt>UNIVERSITY</dt><dd>{siteDetails.university}</dd></div><div><dt>OFFICIAL EMAIL</dt><dd><a href={`mailto:${siteDetails.email}`}><Mail />{siteDetails.email}</a></dd></div></dl>
        </div>
      </div>
      <p className="privacy-note">PRIVACY NOTICE // Only information explicitly added to the editable batch records is displayed.</p>
      <div className="footer-bottom"><p>© 2026 CSE 7th Batch. All rights reserved.</p><p><Terminal /> CONNECTION TERMINATED // SEE YOU IN THE NEXT COMMIT</p></div>
    </footer>
  );
}

function EasterEgg() {
  const [buffer, setBuffer] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const next = `${buffer}${event.key}`.toLowerCase().slice(-10);
      setBuffer(next);
      if (next.endsWith("sudo batch")) { setVisible(true); window.setTimeout(() => setVisible(false), 3200); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [buffer]);
  return visible ? <div className="access-toast" role="status"><Terminal /><div><strong>ACCESS GRANTED</strong><span>WELCOME, CSE-07</span></div></div> : null;
}

export function BatchHeadquarters() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <><Navbar /><main><Hero /><About /><Members /><Achievements /><Memories /><TimelineAndProjects /><BatchWall /></main><Footer /><EasterEgg /></>;
}