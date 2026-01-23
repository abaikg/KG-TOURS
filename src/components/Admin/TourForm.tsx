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
        // @ts-ignore
        const prev = formData[key] || [];
        // @ts-ignore
        updateField(key, [...prev, { day: prev.length + 1, title: '', description: '' }]);
    };

    const removeDay = (lang: Lang, idx: number) => {
        const key = `program_${lang}` as keyof TourInput;
        // @ts-ignore
        const prev = formData[key] || [];
        // @ts-ignore
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
            <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit backdrop-blur-md">
                <button type="button" onClick={() => setActiveLang('ru')}
                    className={cn("px-8 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-xs", activeLang === 'ru' ? "bg-white text-forest-900 shadow-xl" : "text-slate-400 hover:text-white")}>
                    🇷🇺 Русский
                </button>
                <button type="button" onClick={() => setActiveLang('en')}
                    className={cn("px-8 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-xs", activeLang === 'en' ? "bg-white text-forest-900 shadow-xl" : "text-slate-400 hover:text-white")}>
                    🇬🇧 English
                </button>
            </div>

            {/* Common Fields */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-8 tracking-tight uppercase opacity-60">General Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Input label="URL Slug" value={formData.slug} onChange={e => updateField('slug', e.target.value)} error={validationErrors?.slug?.[0]} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                    <Input label="Price ($)" type="number" value={formData.price} onChange={e => updateField('price', Number(e.target.value))} error={validationErrors?.price?.[0]} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                    <Input label="Duration (Days)" type="number" value={formData.duration} onChange={e => updateField('duration', Number(e.target.value))} error={validationErrors?.duration?.[0]} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                    <Input label="Min Group" type="number" value={formData.minGroupSize} onChange={e => updateField('minGroupSize', Number(e.target.value))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />

                    <div className="space-y-2">
                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest">Intensity</label>
                        <select className="nature-input py-3.5 px-6 rounded-xl bg-white/5 border-white/10 text-white font-bold w-full focus:border-forest-700 transition-all cursor-pointer" value={formData.difficulty} onChange={e => updateField('difficulty', e.target.value)}>
                            <option value="easy" className="bg-forest-900">Serene</option>
                            <option value="medium" className="bg-forest-900">Active</option>
                            <option value="hard" className="bg-forest-900">Epic</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-4 pt-8">
                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest">Visibility</label>
                        <button
                            type="button"
                            onClick={() => updateField('isPublished', !formData.isPublished)}
                            className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                formData.isPublished ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-white/5 text-slate-500 border-white/10")}
                        >
                            {formData.isPublished ? 'Live' : 'Draft'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Language Specific Fields Content Card */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md space-y-10">
                <h3 className="text-xl font-bold text-white tracking-tight uppercase opacity-60">Content Details ({activeLang})</h3>

                <div className="space-y-8">
                    <Input label="Narrative Heading"
                        value={activeLang === 'ru' ? formData.title_ru : (formData.title_en || '')}
                        onChange={e => updateField(activeLang === 'ru' ? 'title_ru' : 'title_en', e.target.value)}
                        error={activeLang === 'ru' ? validationErrors?.title_ru?.[0] : undefined}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="Enter a captivating name for this route"
                    />

                    <div className="space-y-3">
                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest">Condensed Description (Excerpt)</label>
                        <textarea
                            className="nature-input min-h-[100px] bg-white/5 border-white/10 text-white rounded-2xl p-6"
                            placeholder="A brief hook for the tour card..."
                            value={activeLang === 'ru' ? formData.shortDescription_ru : (formData.shortDescription_en || '')}
                            onChange={e => updateField(activeLang === 'ru' ? 'shortDescription_ru' : 'shortDescription_en', e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest">The Narrative (Full Story)</label>
                        <textarea
                            className="nature-input min-h-[250px] bg-white/5 border-white/10 text-white rounded-2xl p-8"
                            placeholder="Tell the story of this journey..."
                            value={activeLang === 'ru' ? formData.description_ru : (formData.description_en || '')}
                            onChange={e => updateField(activeLang === 'ru' ? 'description_ru' : 'description_en', e.target.value)}
                        />
                    </div>

                    <Input label="Base Location"
                        value={activeLang === 'ru' ? formData.location_ru : (formData.location_en || '')}
                        onChange={e => updateField(activeLang === 'ru' ? 'location_ru' : 'location_en', e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                    />
                </div>

                {/* Program */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-white mb-8 tracking-tight uppercase opacity-60">Expedition Timeline</h3>
                    {/* @ts-ignore */}
                    {(activeLang === 'ru' ? formData.program_ru : (formData.program_en || [])).map((day: any, idx: number) => (
                        <div key={idx} className="mb-10 p-8 bg-white/[0.02] border border-white/5 rounded-2xl relative group">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center font-bold text-white">D{day.day}</div>
                                    <span className="text-white font-extrabold uppercase tracking-widest text-xs">Phased Progress</span>
                                </div>
                                <button type="button" onClick={() => removeDay(activeLang, idx)} className="text-red-400 text-[10px] font-bold uppercase tracking-widest hover:text-red-300 transition-colors">Abort Phase</button>
                            </div>
                            <div className="grid gap-4">
                                <Input placeholder="Phase Milestone" value={day.title} onChange={e => handleProgram(activeLang, idx, 'title', e.target.value)} className="bg-white/5 border-white/10" />
                                <textarea className="nature-input bg-white/5 border-white/10 min-h-[100px] p-6 text-white rounded-xl text-sm" placeholder="Describe the phase narrative..." value={day.description} onChange={e => handleProgram(activeLang, idx, 'description', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={() => addDay(activeLang)} className="w-full border-white/10 text-white hover:bg-white/10">+ New Phase</Button>
                </div>

                {/* Included/Highlights Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                        <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest opacity-60">Provisioned Services</h4>
                        {/* @ts-ignore */}
                        {(activeLang === 'ru' ? formData.included_ru : (formData.included_en || [])).map((item, idx) => (
                            <div key={idx} className="flex gap-3 mb-3">
                                <Input value={item} onChange={e => handleArray(activeLang, 'included', idx, e.target.value)} className="bg-white/5 border-white/10 h-10 text-sm" />
                                <button type="button" onClick={() => removeArrayItem(activeLang, 'included', idx)} className="text-red-400 text-xl font-light hover:text-red-300">×</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem(activeLang, 'included')} className="mt-4 text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">+ Append Entry</button>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                        <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest opacity-60">Exclusions / Highlights</h4>
                        {/* @ts-ignore */}
                        {(activeLang === 'ru' ? formData.highlights_ru : (formData.highlights_en || [])).map((item, idx) => (
                            <div key={idx} className="flex gap-3 mb-3">
                                <Input value={item} onChange={e => handleArray(activeLang, 'highlights', idx, e.target.value)} className="bg-white/5 border-white/10 h-10 text-sm" />
                                <button type="button" onClick={() => removeArrayItem(activeLang, 'highlights', idx)} className="text-red-400 text-xl font-light hover:text-red-300">×</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem(activeLang, 'highlights')} className="mt-4 text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">+ Append Entry</button>
                    </div>
                </div>
            </div>

            {/* Images Universal */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-8 tracking-tight uppercase opacity-60">Visual Gallery</h3>
                <div className="space-y-4">
                    {formData.images.map((img, idx) => (
                        <div key={idx} className="flex gap-4">
                            <Input placeholder="Direct URL to high-res visual..." value={img} onChange={e => {
                                const newImgs = [...formData.images];
                                newImgs[idx] = e.target.value;
                                updateField('images', newImgs);
                            }} className="bg-white/5 border-white/10 text-white" />
                            <button type="button" onClick={() => updateField('images', formData.images.filter((_, i) => i !== idx))} className="text-red-400 text-xl font-light hover:text-red-300">×</button>
                        </div>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={() => updateField('images', [...formData.images, ''])} className="border-white/10 text-white hover:bg-white/10">+ Add Source</Button>
                </div>
            </div>

            <div className="sticky bottom-8 z-30 px-10">
                <Button type="submit" variant="primary" size="lg" className="w-full shadow-2xl bg-white text-forest-900 border-none h-16 text-xl font-black uppercase tracking-widest hover:bg-white active:scale-[0.98]" isLoading={loading}>
                    {isEdit ? 'Authorize Updates' : 'Commit Expedition'}
                </Button>
            </div>
        </form>
    );
}
