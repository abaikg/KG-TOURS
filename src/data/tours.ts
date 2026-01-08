export type Tour = {
  id: number;
  title: string;
  slug: string;
  days: number;
  price: string;
  shortDescription: string;
  region: string;
  difficulty: "Легкий" | "Средний" | "Сложный";
  images: string[]; // позже добавим реальные картинки
  program: { day: number; title: string; description: string }[];
  included: string[];
  notIncluded: string[];
};

export const tours: Tour[] = [
  {
    id: 1,
    title: "Ала-Арча — однодневный тур",
    slug: "ala-archa-1-day",
    days: 1,
    price: "от 3000 сом",
    shortDescription: "Горный парк недалеко от Бишкека, идеально для прогулки.",
    region: "Чуй",
    difficulty: "Легкий",
    images: ["/tours/ala-archa-1.webp", "/tours/ala-archa-2.webp"],
    program: [
      { day: 1, title: "Выезд и прогулка", description: "Выезд из Бишкека, прогулка по ущелью, фото-остановки." },
    ],
    included: ["Трансфер", "Сопровождение"],
    notIncluded: ["Питание", "Личные расходы"],
  },
  {
    id: 2,
    title: "Сон-Куль — 3 дня",
    slug: "son-kul-3-days",
    days: 3,
    price: "от 15000 сом",
    shortDescription: "Юрты, лошади и настоящее кочевое путешествие.",
    region: "Нарын",
    difficulty: "Средний",
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
    id: 3,
    title: "Иссык-Куль — тур вокруг озера",
    slug: "issyk-kul-tour",
    days: 5,
    price: "от 25000 сом",
    shortDescription: "Каньоны, горячие источники и лучшие места Иссык-Куля.",
    region: "Иссык-Куль",
    difficulty: "Средний",
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
];
