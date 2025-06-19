"use server";

import { cookies } from "next/headers";

export async function clearSelectedProject() {
  (await cookies()).set("selected_project", "");
}
