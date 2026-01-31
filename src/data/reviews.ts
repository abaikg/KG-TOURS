export type Review = {
  id: number;
  name: string;
  country: string;
  rating: number;
  text: string;
  avatar: string;
  photos: string[];
};

export const reviews: Review[] = [
  {
    id: 1,
    name: "Anna",
    country: "Польша",
    rating: 5,
    text: "Это было невероятное приключение! Организация тура в Ала-Арчу превзошла все ожидания. Гид был очень внимателен и рассказал массу интересных фактов о флоре и фауне. Сами горы — это что-то фантастическое, воздух такой чистый, что кружится голова. Обед на природе с видом на ледник стал вишенкой на торте!",
    avatar: "/reviews/avatars/avatar_anna_poland.png",
    photos: [
      "/reviews/photos/anna-1.jpg",
      "/reviews/photos/anna-2.jpg",
      "/reviews/photos/anna-3.jpg",
      "/reviews/photos/anna-4.jpg",
    ],
  },
  {
    id: 2,
    name: "Marco",
    country: "Италия",
    rating: 5,
    text: "Bellissimo! Я много путешествую по Альпам, но горы Тянь-Шаня имеют свою уникальную дикую энергетику. Ночевка в юрте на Сон-Куле — это опыт, который останется со мной навсегда. Звездное небо такое яркое, что кажется, до него можно дотронуться рукой. Отдельное спасибо за вкусный бешбармак!",
    avatar: "/reviews/avatars/avatar_marco_italy.png",
    photos: [
      "/reviews/photos/marco-1.jpg",
      "/reviews/photos/marco-2.jpg",
      "/reviews/photos/marco-3.jpg",
      "/reviews/photos/marco-4.jpg",
    ],
  },
  {
    id: 3,
    name: "Elena",
    country: "Германия",
    rating: 5,
    text: "Мы брали тур вокруг Иссык-Куля и ни разу не пожалели. Контраст пейзажей поражает: от красных каньонов Сказка до зеленых ущелий Джеты-Огуз. Водитель вел машину очень аккуратно, что важно на горных дорогах. Озеро чистое и освежающее. Обязательно приедем еще раз летом.",
    avatar: "/reviews/avatars/avatar_elena_germany.png",
    photos: [
      "/reviews/photos/elena-1.jpg",
      "/reviews/photos/elena-2.jpg",
      "/reviews/photos/elena-3.jpg",
      "/reviews/photos/elena-4.jpg",
    ],
  },
  {
    id: 4,
    name: "Alex",
    country: "Франция",
    rating: 5,
    text: "Фантастический треккинг к пику Комсомола! Маршрут сложный, но виды оправдывают каждый шаг. Гиды профессионалы своего дела, чувствовали себя с ними в полной безопасности. Снаряжение дали отличное. Если вы любите горы и вызовы — это тур для вас.",
    avatar: "/reviews/avatars/avatar_alex_france.png",
    photos: [
      "/reviews/photos/alex-1.jpg",
      "/reviews/photos/alex-2.jpg",
      "/reviews/photos/alex-3.jpg",
      "/reviews/photos/alex-4.jpg",
    ],
  },
  {
    id: 5,
    name: "Sofia",
    country: "Испания",
    rating: 5,
    text: "Кыргызстан — страна с огромным сердцем. Меня поразило гостеприимство местных жителей. В туре в Нарын мы заезжали к чабанам, пили кумыс и ели свежий хлеб. Это не просто туризм, это погружение в культуру. Природа здесь девственная и величественная.",
    avatar: "/reviews/avatars/avatar_sofia_spain.png",
    photos: [
      "/reviews/photos/sofia-1.jpg",
      "/reviews/photos/sofia-2.jpg",
      "/reviews/photos/sofia-3.jpg",
      "/reviews/photos/sofia-4.jpg",
    ],
  },
  {
    id: 6,
    name: "David",
    country: "Великобритания",
    rating: 5,
    text: "I was blown away by the landscapes at Kel-Suu. The color of the water changes constantly depending on the light. The boat ride through the gorge felt like a scene from a fantasy movie. The road there is an adventure in itself, but our 4x4 handled it perfectly. Highly recommended!",
    avatar: "/reviews/avatars/avatar_david_uk.png",
    photos: [
      "/reviews/photos/david-1.jpg",
      "/reviews/photos/david-2.jpg",
      "/reviews/photos/david-3.jpg",
      "/reviews/photos/david-4.jpg",
    ],
  },
  {
    id: 7,
    name: "Yuki",
    country: "Япония",
    rating: 4,
    text: "Очень красиво. Мне понравились лошади и горы. Цветение эдельвейсов было прекрасным. Дорога местами была тряской, но виды того стоили. Хотелось бы чуть больше времени для фотосессий на закате, свет был идеальным.",
    avatar: "/reviews/avatars/avatar_yuki_japan.png",
    photos: [
      "/reviews/photos/yuki-1.jpg",
      "/reviews/photos/yuki-2.jpg",
    ],
  },
  {
    id: 8,
    name: "Olga",
    country: "Россия",
    rating: 5,
    text: "Поездка к подножию пика Ленина — это мощь! Когда видишь этот семитысячник перед собой, захватывает дух. Базовый лагерь очень комфортный, кормят вкусно. Несмотря на высоту, чувствовали себя хорошо благодаря грамотной акклиматизации.",
    avatar: "/reviews/avatars/avatar_olga_russia.png",
    photos: [
      "/reviews/photos/olga-1.jpg",
      "/reviews/photos/olga-2.jpg",
      "/reviews/photos/olga-3.jpg",
      "/reviews/photos/olga-4.jpg",
    ],
  },
  {
    id: 9,
    name: "Thomas",
    country: "Нидерланды",
    rating: 5,
    text: "As a photographer, this tour was a dream. The light in the mountains is incredible. We visited spots that aren't crowded with tourists, so I got some unique shots. The guide knew exactly when to be where for the best lighting. Came back with gigabytes of masterpieces.",
    avatar: "/reviews/avatars/avatar_thomas_netherlands.png",
    photos: [
      "/reviews/photos/thomas-1.jpg",
      "/reviews/photos/thomas-2.jpg",
      "/reviews/photos/thomas-3.jpg",
    ],
  },
  {
    id: 10,
    name: "Mia",
    country: "Швеция",
    rating: 5,
    text: "Спокойствие и величие гор Нарына невозможно передать словами. Это идеальное место для цифрового детокса. Тишина такая, что звенит в ушах. Очень понравились прогулки на лошадях, животные ухоженные и послушные. Спасибо за этот отдых!",
    avatar: "/reviews/avatars/avatar_mia_sweden.png",
    photos: [
      "/reviews/photos/mia-1.jpg",
      "/reviews/photos/mia-2.jpg",
      "/reviews/photos/mia-3.jpg",
      "/reviews/photos/mia-4.jpg",
    ],
  },
];
