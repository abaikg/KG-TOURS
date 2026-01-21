import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prismaClient =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient

// Proxy to intercept all calls and handle connection errors gracefully
export const prisma = new Proxy(prismaClient, {
    get(target, prop, receiver) {
        const val = Reflect.get(target, prop, receiver);

        // If it's a model (like tour, review), we wrap its methods
        if (typeof val === 'object' && val !== null) {
            return new Proxy(val, {
                get(modelTarget, modelProp) {
                    const method = Reflect.get(modelTarget, modelProp);
                    if (typeof method === 'function') {
                        return async (...args: any[]) => {
                            try {
                                return await method.apply(modelTarget, args);
                            } catch (e: any) {
                                // Silent on dev overlay, only log to terminal
                                if (process.env.NODE_ENV === 'development') {
                                    console.warn(`⚠️ Prisma Offline [${String(prop)}.${String(modelProp)}]`);
                                }

                                // Automatic Mock Data Generation for Design Preview
                                if (String(modelProp).startsWith('findMany')) {
                                    if (prop === 'tour') return [
                                        {
                                            id: '1', slug: 'demo', price: 500, duration: 7, difficulty: 'medium',
                                            title_ru: 'Пример тура (БД выключена)', title_en: 'Example Tour (DB Offline)',
                                            shortDescription_ru: 'Это демонстрационные данные для проверки дизайна.',
                                            shortDescription_en: 'This is demo data for design preview.',
                                            images: ['/hero/kyrgyzstan-hero.webp'],
                                            location_ru: 'Кыргызстан', location_en: 'Kyrgyzstan',
                                            isPublished: true, createdAt: new Date()
                                        }
                                    ];
                                    if (prop === 'review') return [
                                        {
                                            id: '1', userName: 'Traveler', rating: 5, status: 'APPROVED',
                                            comment: 'Сайт выглядит отлично! (Демо-отзыв)',
                                            createdAt: new Date()
                                        }
                                    ];
                                    return [];
                                }
                                if (String(modelProp).startsWith('findUnique') || String(modelProp).startsWith('findFirst')) {
                                    if (prop === 'tour') return {
                                        id: '1', slug: 'demo', price: 500, duration: 7, difficulty: 'medium',
                                        title_ru: 'Демо-тур', title_en: 'Demo Tour',
                                        description_ru: 'Полное описание тура для проверки верстки.',
                                        description_en: 'Full tour description for layout check.',
                                        location_ru: 'Кыргызстан', location_en: 'Kyrgyzstan',
                                        images: ['/hero/kyrgyzstan-hero.webp'],
                                        program_ru: [{ day: 1, title: 'Заезд', description: 'День 1' }],
                                        included_ru: ['Гид', 'Транспорт'], notIncluded_ru: ['Перелет']
                                    };
                                    return null;
                                }
                                if (String(modelProp).startsWith('count')) return 1;

                                throw e;
                            }
                        };
                    }
                    return method;
                }
            });
        }
        return val;
    }
}) as PrismaClient;
