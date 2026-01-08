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
    country: "Poland",
    rating: 5,
    text: "Это было одно из самых спокойных и тёплых путешествий в моей жизни. Без спешки, без лишних слов — просто природа, горы и ощущение, что ты в надёжных руках. Кыргызстан открылся очень по-настоящему.",
    avatar: "/reviews/avatars/anna.jpg",
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
    country: "Italy",
    rating: 5,
    text: "Мне понравилось, что маршрут был не утомительным. Мы много гуляли, разговаривали, просто сидели и смотрели на горы. Это не тур «галопом», а настоящее путешествие.",
    avatar: "/reviews/avatars/marco.jpg",
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
    country: "Germany",
    rating: 5,
    text: "Очень ценно, что команда AYAN — местные люди. Они показывают не только красивые места, но и саму жизнь: дороги, остановки, разговоры. Я уехала с чувством наполненности.",
    avatar: "/reviews/avatars/elena.jpg",
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
    country: "France",
    rating: 5,
    text: "Я искал путешествие без экстрима и суеты — и нашёл его здесь. Маленькая группа, комфортный темп и уважение к природе. Всё было очень честно и спокойно.",
    avatar: "/reviews/avatars/alex.jpg",
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
    country: "Spain",
    rating: 5,
    text: "Это путешествие дало мне больше, чем просто красивые фотографии. Я почувствовала тишину, пространство и заботу. AYAN — это про доверие и внимание к деталям.",
    avatar: "/reviews/avatars/sofia.jpg",
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
    country: "United Kingdom",
    rating: 5,
    text: "Очень понравилось, что никто никуда не торопил. Всё происходило естественно. Кыргызстан оказался невероятно тёплым и живым. С удовольствием вернулся бы снова.",
    avatar: "/reviews/avatars/david.jpg",
    photos: [
      "/reviews/photos/david-1.jpg",
      "/reviews/photos/david-2.jpg",
      "/reviews/photos/david-3.jpg",
      "/reviews/photos/david-4.jpg",
    ],
  },
];
