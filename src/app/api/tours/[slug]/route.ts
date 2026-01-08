import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type TourWithImages = Prisma.TourGetPayload<{
  include: {
    images: true;
    program: true;
  };
}>;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const tour = await prisma.tour.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      program: { orderBy: { day: "asc" } },
    },
  });

  if (!tour) return new Response("Not found", { status: 404 });

  const typedTour = tour as TourWithImages;

  return Response.json({
    ...typedTour,
    images: typedTour.images.map((i) => i.url),
  });
}
