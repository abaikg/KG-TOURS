import { prisma } from "@/lib/prisma";

export async function GET() {
  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: { orderBy: { order: "asc" } },
      program: { orderBy: { day: "asc" } },
    },
  });

  return Response.json(
    tours.map((t: { images: Array<{ url: string }> }) => ({
      ...t,
      images: t.images.map((i: { url: string }) => i.url),
    }))
  );
}
