// import { prisma } from "@/lib/prisma";

// export async function GET(
//   _req: Request,
//   { params }: { params: Promise<{ slug: string }> }
// ) {
//   const { slug } = await params;

//   const tour = await prisma.tour.findUnique({
//     where: { slug },
//     include: {
//       images: { orderBy: { order: "asc" } },
//       program: { orderBy: { day: "asc" } },
//     },
//   });

//   if (!tour) return new Response("Not found", { status: 404 });

//   return Response.json({
//     ...tour,
//     images: tour.images.map((i: { url: string }) => i.url),
//   });
// }
