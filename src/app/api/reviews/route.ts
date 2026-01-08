import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/admin";

export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(reviews);
}

export async function POST(req: NextRequest) {
  const auth = assertAdmin(req);
  if (auth) return auth;

  const body = await req.json();

  const rating = Number(body.rating);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return new Response("rating must be 1..5", { status: 400 });
  }

  const created = await prisma.review.create({
    data: {
      name: String(body.name),
      country: body.country ? String(body.country) : null,
      rating,
      text: String(body.text),
      avatarUrl: body.avatarUrl ? String(body.avatarUrl) : null,
      photoUrl: body.photoUrl ? String(body.photoUrl) : null,
      isPublic: body.isPublic === false ? false : true,
    },
  });

  return Response.json(created, { status: 201 });
}
