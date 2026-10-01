import { redirect } from "next/navigation";
import { adminSections } from "@/lib/admin/sections";

export default function AdminHome() {
  redirect(adminSections[0].href);
}
