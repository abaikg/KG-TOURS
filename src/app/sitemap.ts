import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const tours = await prisma.tour.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
    });

    const tourUrls = tours.map((tour) => ({
        url: `${siteConfig.url}/tours/${tour.slug}`,
        lastModified: tour.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${siteConfig.url}/tours`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...tourUrls,
    ];
}
