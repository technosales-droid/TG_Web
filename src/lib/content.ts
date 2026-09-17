import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface CourseRecord {
  slug: string;
  title: string;
  summary: string;
}

export interface CareerRecord {
  slug: string;
  title: string;
  summary: string;
}

export interface FacultyRecord {
  slug: string;
  name: string;
  bio: string;
}

export interface StudentStoryRecord {
  slug: string;
  name: string;
  story: string;
}

function readCollection<T>(collection: string): T[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")) as T);
}

export const getCourses = () => readCollection<CourseRecord>("courses");
export const getCourse = (slug: string) => getCourses().find((c) => c.slug === slug);

export const getCareers = () => readCollection<CareerRecord>("careers");
export const getCareer = (slug: string) => getCareers().find((c) => c.slug === slug);

export const getFaculty = () => readCollection<FacultyRecord>("faculty");
export const getFacultyMember = (slug: string) => getFaculty().find((f) => f.slug === slug);

export const getStudentStories = () => readCollection<StudentStoryRecord>("student-stories");
export const getStudentStory = (slug: string) => getStudentStories().find((s) => s.slug === slug);
