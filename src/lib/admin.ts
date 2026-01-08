import { NextRequest } from "next/server";

export function assertAdmin(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}
