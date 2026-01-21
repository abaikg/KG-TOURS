'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTour, updateTour } from '@/app/actions/tours';
import { TourInput, TourSchema } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { z } from 'zod';

type TourFormProps = {
    initialData?: TourInput & { id?: string };
    isEdit?: boolean;
};

type Lang = 'ru' | 'en';

export default function TourForm({ initialData, isEdit = false }: TourFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeLang, setActiveLang] = useState<Lang>('ru');
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

    const [formData, setFormData] = useState<TourInput>(initialData || {
        // RU
        title_ru: '', description_ru: '', shortDescription_ru: '', location_ru: '',
        program_ru: [{ day: 1, title: '', description: '' }],
        included_ru: [''], notIncluded_ru: [''], highlights_ru: [''],

        // EN
        title_en: '', description_en: '', shortDescription_en: '', location_en: '',
        program_en: [{ day: 1, title: '', description: '' }],
        included_en: [''], notIncluded_en: [''], highlights_en: [''],

        // Common
        slug: '', price: 0, duration: 1, minGroupSize: 1,
        images: [''], difficulty: 'medium', currency: 'USD', isPublished: false
    });

    const updateField = (field: keyof TourInput, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArray = (
        lang: Lang,
        field: 'included' | 'notIncluded' | 'highlights',
        idx: number,
        value: string
    ) => {
        const key = `${field}_${lang}` as keyof TourInput;
        // @ts-ignore
        const currentArr = [...(formData[key] as string[])];
        currentArr[idx] = value;
        updateField(key, currentArr);
    };

    const addArrayItem = (lang: Lang, field: 'included' | 'notIncluded' | 'highlights') => {
        const key = `${field}_${lang}` as keyof TourInput;
        // @ts-ignore
        updateField(key, [...(formData[key] as string[]), '']);
    };

    const removeArrayItem = (lang: Lang, field: 'included' | 'notIncluded' | 'highlights', idx: number) => {
        const key = `${field}_${lang}` as keyof TourInput;
        // @ts-ignore
        updateField(key, (formData[key] as string[]).filter((_, i) => i !== idx));
    };

    // Program Helpers
    const handleProgram = (lang: Lang, idx: number, field: 'title' | 'description', value: string) => {
        const key = `program_${lang}` as keyof TourInput;
        // @ts-ignore
        const newProg = [...(formData[key] || [])];
        if (!newProg[idx]) newProg[idx] = { day: idx + 1, title: '', description: '' };
        newProg[idx] = { ...newProg[idx], [field]: value };
        updateField(key, newProg);
    };

    const addDay = (lang: Lang) => {
        const key = `program_${lang}` as keyof TourInput;
        // @ts-ignore
        const prev = formData[key] || [];
        updateField(key, [...prev, { day: prev.length + 1, title: '', description: '' }]);
    };

    const removeDay = (lang: Lang, idx: number) => {
        const key = `program_${lang}` as keyof TourInput;
        // @ts-ignore
        const prev = formData[key] || [];
        updateField(key, prev.filter((_, i) => i !== idx).map((d: any, i: number) => ({ ...d, day: i + 1 })));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setValidationErrors(null);

        const validation = TourSchema.safeParse(formData);
        if (!validation.success) {
            setValidationErrors(validation.error.flatten().fieldErrors);
            setLoading(false);
            console.log(validation.error.flatten().fieldErrors);
            return;
        }

        try {
            const res = isEdit && initialData?.id
                ? await updateTour(initialData.id ?? '', formData) // Should pass ID if updating
                : await createTour(formData);

            if (res.success) {
                router.push('/admin/tours');
                router.refresh();
            } else {
                console.error(res.message);
                // @ts-ignore
                if (res.errors) setValidationErrors(res.errors);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <div className="flex gap-4 border-b border-white/10 pb-4">
                <button type="button" onClick={() => setActiveLang('ru')}
                    className={cn("px-4 py-2 rounded-lg font-bold transition", activeLang === 'ru' ? "bg-primary text-white" : "text-slate-400 hover:text-white")}>
                    🇷🇺 Russian (Main)
                </button>
                <button type="button" onClick={() => setActiveLang('en')}
                    className={cn("px-4 py-2 rounded-lg font-bold transition", activeLang === 'en' ? "bg-primary text-white" : "text-slate-400 hover:text-white")}>
                    🇬🇧 English
                </button>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input label="Slug (URL)" value={formData.slug} onChange={e => updateField('slug', e.target.value)} error={validationErrors?.slug?.[0]} />
                <Input label="Price ($)" type="number" value={formData.price} onChange={e => updateField('price', Number(e.target.value))} error={validationErrors?.price?.[0]} />
                <Input label="Duration (Days)" type="number" value={formData.duration} onChange={e => updateField('duration', Number(e.target.value))} error={validationErrors?.duration?.[0]} />
                <Input label="Min Group Size" type="number" value={formData.minGroupSize} onChange={e => updateField('minGroupSize', Number(e.target.value))} />
                <div><label className="text-white text-sm">Difficulty</label>
                    <select className="glass-input mt-1" value={formData.difficulty} onChange={e => updateField('difficulty', e.target.value)}>
                        <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
                    </select></div>
            </div>

            {/* Language Specific Fields */}
            <div className="space-y-6 animate-in fade-in duration-300">
                <Input label={`Title (${activeLang.toUpperCase()})`}
                    value={activeLang === 'ru' ? formData.title_ru : (formData.title_en || '')}
                    onChange={e => updateField(activeLang === 'ru' ? 'title_ru' : 'title_en', e.target.value)}
                    error={activeLang === 'ru' ? validationErrors?.title_ru?.[0] : undefined}
                />

                <div className="space-y-2">
                    <label className="text-slate-300 text-sm">Short Description</label>
                    <textarea
                        className="glass-input min-h-[80px]"
                        value={activeLang === 'ru' ? formData.shortDescription_ru : (formData.shortDescription_en || '')}
                        onChange={e => updateField(activeLang === 'ru' ? 'shortDescription_ru' : 'shortDescription_en', e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-slate-300 text-sm">Full Description (Markdown supported)</label>
                    <textarea
                        className="glass-input min-h-[200px]"
                        value={activeLang === 'ru' ? formData.description_ru : (formData.description_en || '')}
                        onChange={e => updateField(activeLang === 'ru' ? 'description_ru' : 'description_en', e.target.value)}
                    />
                </div>

                <Input label="Location"
                    value={activeLang === 'ru' ? formData.location_ru : (formData.location_en || '')}
                    onChange={e => updateField(activeLang === 'ru' ? 'location_ru' : 'location_en', e.target.value)}
                />

                {/* Program */}
                <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Program ({activeLang.toUpperCase()})</h3>
                    {/* @ts-ignore */}
                    {(activeLang === 'ru' ? formData.program_ru : (formData.program_en || [])).map((day: any, idx: number) => (
                        <div key={idx} className="mb-6 border-l-2 border-primary/30 pl-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-primary font-bold">Day {day.day}</span>
                                <button type="button" onClick={() => removeDay(activeLang, idx)} className="text-red-400 text-sm">Remove</button>
                            </div>
                            <div className="grid gap-3">
                                <Input placeholder="Day Title" value={day.title} onChange={e => handleProgram(activeLang, idx, 'title', e.target.value)} />
                                <textarea className="glass-input" rows={2} placeholder="Description" value={day.description} onChange={e => handleProgram(activeLang, idx, 'description', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={() => addDay(activeLang)}>+ Add Day</Button>
                </div>

                {/* Lists (Included/Highlights) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass p-4 rounded-xl">
                        <h4 className="font-bold text-white mb-2">Included</h4>
                        {/* @ts-ignore */}
                        {(activeLang === 'ru' ? formData.included_ru : (formData.included_en || [])).map((item, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <Input value={item} onChange={e => handleArray(activeLang, 'included', idx, e.target.value)} />
                                <button type="button" onClick={() => removeArrayItem(activeLang, 'included', idx)} className="text-red-400">×</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem(activeLang, 'included')} className="text-primary text-sm">+ Add</button>
                    </div>

                    <div className="glass p-4 rounded-xl">
                        <h4 className="font-bold text-white mb-2">Highlights/Not Included</h4>
                        {/* Same logic for highlights/notIncluded if needed, kept simple for now */}
                        {/* @ts-ignore */}
                        {(activeLang === 'ru' ? formData.highlights_ru : (formData.highlights_en || [])).map((item, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <Input value={item} onChange={e => handleArray(activeLang, 'highlights', idx, e.target.value)} />
                                <button type="button" onClick={() => removeArrayItem(activeLang, 'highlights', idx)} className="text-red-400">×</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem(activeLang, 'highlights')} className="text-primary text-sm">+ Add</button>
                    </div>
                </div>
            </div>

            {/* Images Universal */}
            <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Gallery (URLs)</h3>
                <div className="grid gap-4">
                    {formData.images.map((img, idx) => (
                        <div key={idx} className="flex gap-2">
                            <Input placeholder="https://..." value={img} onChange={e => {
                                const newImgs = [...formData.images];
                                newImgs[idx] = e.target.value;
                                updateField('images', newImgs);
                            }} />
                            <button type="button" onClick={() => updateField('images', formData.images.filter((_, i) => i !== idx))} className="text-red-400">×</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField('images', [...formData.images, ''])} className="text-primary text-sm">+ Add Image</button>
                </div>
            </div>

            <div className="sticky bottom-4 z-20">
                <Button type="submit" variant="primary" size="lg" className="w-full shadow-2xl shadow-primary/40" isLoading={loading}>
                    {isEdit ? 'Save Changes' : 'Create Tour'}
                </Button>
            </div>
        </form>
    );
}
