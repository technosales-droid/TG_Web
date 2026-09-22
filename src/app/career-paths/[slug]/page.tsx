import { redirect } from "next/navigation";

// Career Paths has been retired and replaced by Blogs; no per-slug career pages exist any more.
export default function CareerPage() {
  redirect("/blogs");
}
