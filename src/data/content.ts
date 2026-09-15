export type Achievement = {
  year: string;
  title: string;
  studentOrTeam: string;
  description: string;
  image?: string;
  link?: string;
  isPlaceholder?: boolean;
};

export type Memory = {
  image: string;
  alt: string;
  caption?: string;
  date?: string;
  event?: string;
  category: "CAMPUS" | "EVENTS" | "TOURS" | "PROJECTS" | "COMPETITIONS" | "RANDOM MOMENTS";
  isPlaceholder?: boolean;
};

export type Project = {
  name: string;
  creator: string;
  description: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  isPlaceholder?: boolean;
};

export const siteDetails = {
  university: "UNIVERSITY NAME — REPLACE",
  department: "Computer Science & Engineering",
  batch: "07",
  email: "batch-email@example.edu",
};

export const stats = [
  { value: "—", label: "TOTAL MEMBERS" },
  { value: "—", label: "MALE" },
  { value: "—", label: "FEMALE" },
  { value: "—", label: "TEAMS / CLUBS" },
  { value: "—", label: "PROJECTS" },
  { value: "—", label: "ACHIEVEMENTS" },
];

export const achievements: Achievement[] = [
  {
    year: "YEAR",
    title: "ACHIEVEMENT TITLE — REPLACE",
    studentOrTeam: "STUDENT / TEAM — REPLACE",
    description: "Add a verified competition, research, scholarship, leadership, sports, or cultural achievement here.",
    isPlaceholder: true,
  },
  {
    year: "YEAR",
    title: "MISSION RECORD — REPLACE",
    studentOrTeam: "STUDENT / TEAM — REPLACE",
    description: "This is placeholder content. Replace it with the real story and details of the achievement.",
    isPlaceholder: true,
  },
];

export const memories: Memory[] = [
  { image: "/memories/memory-01.jpg", alt: "Replace with a real batch memory", caption: "MEMORY PLACEHOLDER", event: "EVENT — REPLACE", category: "CAMPUS", isPlaceholder: true },
  { image: "/memories/memory-02.jpg", alt: "Replace with a real batch event", caption: "MEMORY PLACEHOLDER", event: "EVENT — REPLACE", category: "EVENTS", isPlaceholder: true },
  { image: "/memories/memory-03.jpg", alt: "Replace with a real batch tour", caption: "MEMORY PLACEHOLDER", event: "EVENT — REPLACE", category: "TOURS", isPlaceholder: true },
  { image: "/memories/memory-04.jpg", alt: "Replace with a real batch project", caption: "MEMORY PLACEHOLDER", event: "EVENT — REPLACE", category: "PROJECTS", isPlaceholder: true },
  { image: "/memories/memory-05.jpg", alt: "Replace with a real competition memory", caption: "MEMORY PLACEHOLDER", event: "EVENT — REPLACE", category: "COMPETITIONS", isPlaceholder: true },
];

export const timeline = [
  { marker: "DATE", title: "THE JOURNEY BEGINS", description: "Replace with the verified starting point of the batch journey." },
  { marker: "DATE", title: "MILESTONE — REPLACE", description: "Add a real academic, community, or shared milestone." },
  { marker: "DATE", title: "THE BATCH EVOLVES", description: "Replace with a verified event and date." },
  { marker: "NEXT", title: "STILL COMPILING", description: "The next chapter belongs to the batch." },
];

export const projects: Project[] = [
  {
    name: "PROJECT NAME — REPLACE",
    creator: "CREATOR — REPLACE",
    description: "Add a concise description of a real project built by batch members.",
    technologies: ["TECH", "STACK"],
    isPlaceholder: true,
  },
  {
    name: "CREATION — REPLACE",
    creator: "CREATOR — REPLACE",
    description: "This demonstration record should be replaced before publishing real batch work.",
    technologies: ["TECH", "STACK"],
    isPlaceholder: true,
  },
  {
    name: "BUILD — REPLACE",
    creator: "CREATOR — REPLACE",
    description: "Add links, imagery, technologies, and the verified creator in this data file.",
    technologies: ["TECH", "STACK"],
    isPlaceholder: true,
  },
];

export const quotes = [
  { quote: "Add a real batch quote here.", author: "STUDENT — REPLACE" },
  { quote: "Every node carries a story worth remembering.", author: "PLACEHOLDER COPY" },
  { quote: "Connected by code. Defined by memories.", author: "PLACEHOLDER COPY" },
];