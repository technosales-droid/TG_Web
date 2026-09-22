import { redirect } from "next/navigation";

// Faculty is now covered by the combined About destination; no per-member pages exist.
export default function FacultyMemberPage() {
  redirect("/about/facilities");
}
