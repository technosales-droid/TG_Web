import { redirect } from "next/navigation";

// Faculty is now covered by the combined About destination.
export default function Page() {
  redirect("/about/facilities");
}
