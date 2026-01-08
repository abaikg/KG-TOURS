// import { NextRequest } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { assertAdmin } from "@/lib/admin";

// function toDifficulty(d: string) {
//   const v = d.toLowerCase();
//   if (v === "легкий" || v === "easy") return "EASY";
//   if (v === "средний" || v === "medium") return "MEDIUM";
//   if (v === "сложный" || v === "hard") return "HARD";
//   return "EASY";
// }

// export async function GET() {
//   const tours = await prisma.tour.findMany({
//     orderBy: { createdAt: "desc" },
//     include: {
//       images: { orderBy: { order: "asc" } },
//       program: { orderBy: { day: "asc" } },
//     },
//   });

//   return Response.json(
//     tours.map((t: { images: Array<{ url: string }> }) => ({
//       ...t,
//       images: t.images.map((i: { url: string }) => i.url),
//     }))
//   );
// }

// export async function POST(req: NextRequest) {
//   const auth = assertAdmin(req);
//   if (auth) return auth;

//   const body = await req.json();

//   const created = await prisma.tour.create({
//     data: {
//       title: String(body.title),
//       slug: String(body.slug),
//       days: Number(body.days),
//       price: String(body.price),
//       shortDescription: String(body.shortDescription ?? ""),
//       region: String(body.region ?? ""),
//       difficulty: toDifficulty(String(body.difficulty ?? "EASY")) as any,
//       included: Array.isArray(body.included) ? body.included.map(String) : [],
//       notIncluded: Array.isArray(body.notIncluded) ? body.notIncluded.map(String) : [],
//       images: {
//         create: (Array.isArray(body.images) ? body.images : []).map((url: string, idx: number) => ({
//           url: String(url),
//           order: idx,
//         })),
//       },
//       program: {
//         create: (Array.isArray(body.program) ? body.program : []).map((p: any) => ({
//           day: Number(p.day),
//           title: String(p.title),
//           description: String(p.description),
//         })),
//       },
//     },
//     include: {
//       images: { orderBy: { order: "asc" } },
//       program: { orderBy: { day: "asc" } },
//     },
//   });

//   return Response.json(
//     {
//       ...created,
//       images: created.images.map((i: { url: string }) => i.url),
//     },
//     { status: 201 }
//   );
// }
