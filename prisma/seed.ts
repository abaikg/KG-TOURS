import { prisma } from "../src/lib/prisma";

async function main() {
  // очистка (если хочешь)
  await prisma.tourDay.deleteMany();
  await prisma.tourImage.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.review.deleteMany();

  const tours = [
    {
      title: "Ала-Арча — однодневный тур",
      slug: "ala-archa-1-day",
      days: 1,
      price: "от 3000 сом",
      shortDescription: "Горный парк недалеко от Бишкека, идеально для прогулки.",
      region: "Чуй",
      difficulty: "EASY",
      images: ["/tours/ala-archa-1.webp", "/tours/ala-archa-2.webp"],
      program: [{ day: 1, title: "Выезд и прогулка", description: "Выезд из Бишкека, прогулка по ущелью, фото-остановки." }],
      included: ["Трансфер", "Сопровождение"],
      notIncluded: ["Питание", "Личные расходы"],
    },
    {
      title: "Сон-Куль — 3 дня",
      slug: "son-kul-3-days",
      days: 3,
      price: "от 15000 сом",
      shortDescription: "Юрты, лошади и настоящее кочевое путешествие.",
      region: "Нарын",
      difficulty: "MEDIUM",
      images: ["/tours/son-kul-1.webp", "/tours/son-kul-2.webp"],
      program: [
        { day: 1, title: "Дорога на Сон-Куль", description: "Выезд, перевалы, прибытие к озеру, заселение в юрты." },
        { day: 2, title: "Озеро и прогулки", description: "Прогулки, катание на лошадях (по желанию), вечер у костра." },
        { day: 3, title: "Возвращение", description: "Завтрак, выезд обратно, остановки по пути." },
      ],
      included: ["Трансфер", "Проживание в юртах", "Сопровождение"],
      notIncluded: ["Лошади (по желанию)", "Личные расходы"],
    },
    {
      title: "Иссык-Куль — тур вокруг озера",
      slug: "issyk-kul-tour",
      days: 5,
      price: "от 25000 сом",
      shortDescription: "Каньоны, горячие источники и лучшие места Иссык-Куля.",
      region: "Иссык-Куль",
      difficulty: "MEDIUM",
      images: ["/tours/issyk-kul-1.webp", "/tours/issyk-kul-2.webp"],
      program: [
        { day: 1, title: "Чолпон-Ата", description: "Выезд, прибытие, прогулка, отдых." },
        { day: 2, title: "Каньоны", description: "Каньоны и смотровые площадки, фото, пикник." },
        { day: 3, title: "Южный берег", description: "Переезд на юг, природа, местная кухня." },
        { day: 4, title: "Горячие источники", description: "Купание в источниках, отдых." },
        { day: 5, title: "Возвращение", description: "Возвращение в Бишкек." },
      ],
      included: ["Трансфер", "Сопровождение"],
      notIncluded: ["Проживание (если нужно)", "Питание", "Личные расходы"],
    },
  ] as const;

  for (const t of tours) {
    await prisma.tour.create({
      data: {
        title: t.title,
        slug: t.slug,
        days: t.days,
        price: t.price,
        shortDescription: t.shortDescription,
        region: t.region,
        difficulty: t.difficulty as any,
        included: [...t.included],
        notIncluded: [...t.notIncluded],
        images: { create: t.images.map((url, idx) => ({ url, order: idx })) },
        program: { create: t.program.map((p) => ({ ...p })) },
      },
    });
  }

  const reviews = [
    {
      name: "Айжан",
      country: "Кыргызстан",
      rating: 5,
      text: "Очень спокойный формат, без спешки. Организация на высоте — чувствовала себя в безопасности.",
      avatarUrl: "/avatars/aizhan.webp",
      photoUrl: "/reviews/rev-1.webp",
    },
    {
      name: "Dmitry",
      country: "Казахстан",
      rating: 5,
      text: "Сон-Куль — любовь. Ночёвка в юрте и звёзды — незабываемо. Команда внимательная к деталям.",
      avatarUrl: "/avatars/dmitry.webp",
      photoUrl: "/reviews/rev-2.webp",
    },
    {
      name: "Elena",
      country: "Россия",
      rating: 5,
      text: "Понравилось, что маленькая группа и комфортный темп. Природа потрясающая, гиды очень тактичные.",
      avatarUrl: "/avatars/elena.webp",
      photoUrl: "/reviews/rev-3.webp",
    },
    {
      name: "Amina",
      country: "Узбекистан",
      rating: 4,
      text: "Маршрут продуман, много красивых мест и времени просто остановиться и посмотреть вокруг.",
      avatarUrl: "/avatars/amina.webp",
      photoUrl: "/reviews/rev-4.webp",
    },
    {
      name: "Nikita",
      country: "Кыргызстан",
      rating: 5,
      text: "Иссык-Куль вокруг озера — топ. Особенно горячие источники. Всё четко по времени и без суеты.",
      avatarUrl: "/avatars/nikita.webp",
      photoUrl: "/reviews/rev-5.webp",
    },
    {
      name: "Sara",
      country: "Germany",
      rating: 5,
      text: "Authentic experience, not a tourist show. Loved the people, the pace, and the landscapes.",
      avatarUrl: "/avatars/sara.webp",
      photoUrl: "/reviews/rev-6.webp",
    },
  ];

  await prisma.review.createMany({ data: reviews });

  console.log("✅ Seed done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
