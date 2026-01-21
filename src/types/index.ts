import { z } from 'zod';

// Enums (matching Prisma)
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

export enum ReviewStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

// Tour Schemas
const ProgramNoteSchema = z.object({
    day: z.number(),
    title: z.string(),
    description: z.string(),
});

export const TourSchema = z.object({
    // RU
    title_ru: z.string().min(3, "Название (RU) обязательно"),
    description_ru: z.string().min(10, "Описание (RU) обязательно"),
    shortDescription_ru: z.string().min(10, "Краткое описание (RU) обязательно"),
    location_ru: z.string().min(2, "Локация (RU) обязательна"),
    program_ru: z.array(ProgramNoteSchema).min(1, "Программа (RU) обязательна"),
    included_ru: z.array(z.string()),
    notIncluded_ru: z.array(z.string()),
    highlights_ru: z.array(z.string()),

    // EN (Optional initially, but good to validate structure if present)
    title_en: z.string().optional(),
    description_en: z.string().optional(),
    shortDescription_en: z.string().optional(),
    location_en: z.string().optional(),
    program_en: z.array(ProgramNoteSchema).optional(),
    included_en: z.array(z.string()).optional(),
    notIncluded_en: z.array(z.string()).optional(),
    highlights_en: z.array(z.string()).optional(),

    // Common
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must vary"),
    price: z.coerce.number().positive(),
    currency: z.string().default("USD"),
    duration: z.coerce.number().int().positive(),
    images: z.array(z.string().url()).min(1, "Минимум 1 фото"),
    difficulty: z.string(),
    minGroupSize: z.coerce.number().int().min(1).default(1),
    isPublished: z.boolean().default(false),
});

export type TourInput = z.infer<typeof TourSchema>;

// Review Schemas
export const ReviewSchema = z.object({
    rating: z.coerce.number().min(1).max(5),

    text_ru: z.string().optional(),
    text_en: z.string().optional(),

    authorName: z.string().min(2, "Имя обязательно"),
    tourId: z.string(),
});

export type ReviewInput = z.infer<typeof ReviewSchema>;

// Booking Schemas
export const BookingSchema = z.object({
    tourId: z.string(),
    userId: z.string().optional(),
    customerName: z.string().min(2, "Имя обязательно"),
    email: z.string().email("Некорректный email"),
    phone: z.string().min(5, "Телефон обязателен"),
    date: z.string().datetime().or(z.date()),
    peopleCount: z.coerce.number().min(1).default(1),
    comment: z.string().optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;
