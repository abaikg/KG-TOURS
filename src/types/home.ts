// types/home.ts
export interface HomeTour {
  id: string;
  slug: string;
  price: number;
  duration: number;
  difficulty: string;
  title_ru: string;
  title_en: string;
  shortDescription_ru: string;
  shortDescription_en: string;
  images: string[];
}

export interface HomeReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
