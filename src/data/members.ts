export type Member = {
  name: string;
  roll: string;
  registration: string;
  studentId: string;
  email: string;
  personalEmail?: string;
  image: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  role?: string;
  isPlaceholder?: boolean;
};

/**
 * Replace these clearly marked records with real batch members.
 * Add one object here and the directory, filters, counts, and profile view update automatically.
 */
export const members: Member[] = [
  {
    name: "STUDENT NAME 01",
    roll: "CSE-07XX",
    registration: "REGISTRATION PLACEHOLDER",
    studentId: "STUDENT ID PLACEHOLDER",
    email: "student01@example.edu",
    image: "/members/student-01.jpg",
    role: "ROLE PLACEHOLDER",
    isPlaceholder: true,
  },
  {
    name: "STUDENT NAME 02",
    roll: "CSE-07XX",
    registration: "REGISTRATION PLACEHOLDER",
    studentId: "STUDENT ID PLACEHOLDER",
    email: "student02@example.edu",
    image: "/members/student-02.jpg",
    isPlaceholder: true,
  },
  {
    name: "STUDENT NAME 03",
    roll: "CSE-07XX",
    registration: "REGISTRATION PLACEHOLDER",
    studentId: "STUDENT ID PLACEHOLDER",
    email: "student03@example.edu",
    image: "/members/student-03.jpg",
    role: "ROLE PLACEHOLDER",
    isPlaceholder: true,
  },
  {
    name: "STUDENT NAME 04",
    roll: "CSE-07XX",
    registration: "REGISTRATION PLACEHOLDER",
    studentId: "STUDENT ID PLACEHOLDER",
    email: "student04@example.edu",
    image: "/members/student-04.jpg",
    isPlaceholder: true,
  },
];