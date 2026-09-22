import { redirect } from "next/navigation";

// Career Paths has been retired and replaced by Blogs in the site's information architecture.
export default function Page() {
  redirect("/blogs");
}
