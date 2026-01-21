import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Create demo tours
    const tour1 = await prisma.tour.upsert({
        where: { slug: 'ala-archa-day-trip' },
        update: {},
        create: {
            slug: 'ala-archa-day-trip',
            title_ru: 'Однодневный поход в Ала-Арчу',
            title_en: 'Ala-Archa Day Trip',
            description_ru: 'Насладитесь красотой национального парка Ала-Арча всего в 40 км от Бишкека. Живописные горные пейзажи, чистый воздух и незабываемые виды на пики Тянь-Шаня.',
            description_en: 'Enjoy the beauty of Ala-Archa National Park just 40 km from Bishkek. Scenic mountain landscapes, fresh air and unforgettable views of the Tien Shan peaks.',
            shortDescription_ru: 'Горный поход недалеко от столицы',
            shortDescription_en: 'Mountain hike near the capital',
            location_ru: 'Ала-Арча, Чуйская область',
            location_en: 'Ala-Archa, Chuy Region',
            price: 50,
            currency: 'USD',
            duration: 1,
            difficulty: 'easy',
            minGroupSize: 2,
            isPublished: true,
            images: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
            ],
            program_ru: [
                { day: 1, title: 'Поход в ущелье', description: 'Выезд из Бишкека в 9:00, треккинг по ущелью, обед на природе, возвращение к 18:00' }
            ],
            program_en: [
                { day: 1, title: 'Gorge Hike', description: 'Departure from Bishkek at 9:00, trekking through the gorge, picnic lunch, return by 18:00' }
            ],
            included_ru: ['Транспорт', 'Гид', 'Обед'],
            included_en: ['Transport', 'Guide', 'Lunch'],
            notIncluded_ru: ['Личные расходы'],
            notIncluded_en: ['Personal expenses'],
            highlights_ru: ['Виды на пики 4000м+', 'Водопады', 'Альпийские луга'],
            highlights_en: ['Views of 4000m+ peaks', 'Waterfalls', 'Alpine meadows'],
        },
    });

    const tour2 = await prisma.tour.upsert({
        where: { slug: 'issyk-kul-adventure' },
        update: {},
        create: {
            slug: 'issyk-kul-adventure',
            title_ru: 'Приключение на Иссык-Куле',
            title_en: 'Issyk-Kul Adventure',
            description_ru: 'Откройте для себя жемчужину Кыргызстана - озеро Иссык-Куль. Второе по величине высокогорное озеро в мире с кристально чистой водой и потрясающими пейзажами.',
            description_en: 'Discover the pearl of Kyrgyzstan - Issyk-Kul Lake. The second largest alpine lake in the world with crystal clear water and stunning scenery.',
            shortDescription_ru: 'Тур к высокогорному озеру',
            shortDescription_en: 'Tour to the alpine lake',
            location_ru: 'Иссык-Куль',
            location_en: 'Issyk-Kul',
            price: 350,
            currency: 'USD',
            duration: 3,
            difficulty: 'medium',
            minGroupSize: 4,
            isPublished: true,
            images: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
            ],
            program_ru: [
                { day: 1, title: 'Переезд к озеру', description: 'Выезд из Бишкека, остановки в живописных местах, размещение в гостевом доме' },
                { day: 2, title: 'Экскурсии', description: 'Посещение каньонов Сказка и Барскоон, купание в озере' },
                { day: 3, title: 'Возвращение', description: 'Утренняя прогулка, обед, возвращение в Бишкек' }
            ],
            program_en: [
                { day: 1, title: 'Transfer to the lake', description: 'Departure from Bishkek, stops at scenic spots, accommodation in guesthouse' },
                { day: 2, title: 'Excursions', description: 'Visit Skazka and Barskoon canyons, swimming in the lake' },
                { day: 3, title: 'Return', description: 'Morning walk, lunch, return to Bishkek' }
            ],
            included_ru: ['Транспорт', 'Проживание', 'Питание', 'Гид'],
            included_en: ['Transport', 'Accommodation', 'Meals', 'Guide'],
            notIncluded_ru: ['Личные расходы', 'Алкоголь'],
            notIncluded_en: ['Personal expenses', 'Alcohol'],
            highlights_ru: ['Купание в озере', 'Каньон Сказка', 'Местная кухня'],
            highlights_en: ['Swimming in the lake', 'Skazka Canyon', 'Local cuisine'],
        },
    });

    // Create demo reviews
    await prisma.review.create({
        data: {
            tourId: tour1.id,
            authorName: 'Анна Петрова',
            rating: 5,
            text_ru: 'Потрясающий тур! Гид был очень профессиональным, виды невероятные. Обязательно вернусь еще раз!',
            text_en: 'Amazing tour! The guide was very professional, the views are incredible. Will definitely come back!',
            status: 'APPROVED',
        },
    });

    await prisma.review.create({
        data: {
            tourId: tour2.id,
            authorName: 'John Smith',
            rating: 5,
            text_ru: 'Лучший отпуск в моей жизни! Озеро просто волшебное, организация на высшем уровне.',
            text_en: 'Best vacation of my life! The lake is simply magical, organization is top-notch.',
            status: 'APPROVED',
        },
    });

    console.log('✅ Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
