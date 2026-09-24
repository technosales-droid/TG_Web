import { redirect } from "next/navigation";

// Faculty are shown as cards on the Faculty & Facilities page; there are no per-member pages.
export default function FacultyMemberPage() {
  redirect("/about/facilities");
}
