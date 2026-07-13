import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X as XIcon, ZoomIn as ZoomInIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ArrowRight as ArrowRightIcon, Loader2 } from 'lucide-react';
import { galleryApi } from '../services/api';

interface GalleryItem {
    id: string;
    src: string;
    thumb: string;
    title: string;
    category: string;
    description: string;
}

const CATEGORIES = ['All', 'Office Life', 'Team Events', 'Client Work', 'Training', 'Corporate'] as const;

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox: React.FC<{
    items: GalleryItem[];
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}> = ({ items, index, onClose, onPrev, onNext }) => {
    const item = items[index];
    if (!item) return null;
    
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <div
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-gray-950 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={item.src}
                    alt={item.title}
                    className="w-full max-h-[70vh] object-cover"
                />
                <div className="p-5 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-2 py-0.5 rounded-full font-medium">
                            {item.category}
                        </span>
                        <span className="text-gray-500 text-xs">{index + 1} / {items.length}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>

            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            >
                <XIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const GalleryPage: React.FC = () => {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setLoading(true);
                const res = await galleryApi.list();
                if (res.success && res.data) {
                    const mappedItems = res.data.map((item) => ({
                        id: item.id,
                        src: item.src.startsWith('/') ? `${API_BASE_URL}${item.src}` : item.src,
                        thumb: item.thumb.startsWith('/') ? `${API_BASE_URL}${item.thumb}` : item.thumb,
                        title: item.title,
                        category: item.category,
                        description: item.description
                    }));
                    setGalleryItems(mappedItems);
                }
            } catch (e) {
                console.error('Failed to load gallery items:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, [API_BASE_URL]);

    const filtered = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((g) => g.category === activeCategory);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const prevPhoto = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));
    const nextPhoto = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));

    return (
        <div className="bg-gradient-to-b from-primary-950 via-gray-950 to-black min-h-screen text-white">

            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-gray-950/80 to-black/90" />
                </div>
                <div className="relative max-w-3xl mx-auto text-center px-4">
                    <span className="inline-block bg-secondary-500/20 text-secondary-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-secondary-500/30 mb-6">
                        Our Gallery
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Life at
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-primary-300">
                            Parmy Technologies
                        </span>
                    </h1>
                    <p className="text-gray-300 text-xl leading-relaxed">
                        A window into our culture, our workspace, and the people who make Parmy what it is — curious, driven, and always building something meaningful.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <div className="sticky top-16 z-30 bg-gray-950/80 backdrop-blur-md border-b border-white/10 py-4">
                <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-3">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeCategory === cat
                                ? 'bg-secondary-500 border-secondary-500 text-white shadow-lg'
                                : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/40'
                                }`}
                        >
                            {cat}
                            <span className="ml-2 text-xs opacity-60">
                                {cat === 'All' ? galleryItems.length : galleryItems.filter((g) => g.category === cat).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry-style Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 space-y-4">
                        <Loader2 className="h-10 w-10 text-secondary-500 animate-spin" />
                        <p className="text-gray-400 text-sm font-medium">Loading gallery photos...</p>
                    </div>
                ) : (
                    <>
                        {/* Featured row — first 2 items large */}
                        {activeCategory === 'All' && galleryItems.length >= 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {galleryItems.slice(0, 2).map((item, i) => (
                                    <div
                                        key={item.id}
                                        className="relative group overflow-hidden rounded-2xl cursor-pointer h-72 md:h-96"
                                        onClick={() => openLightbox(i)}
                                    >
                                        <img
                                            src={item.thumb}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <span className="text-xs bg-secondary-500/80 text-white px-2 py-0.5 rounded-full mb-2 inline-block">{item.category}</span>
                                            <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                            <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                                        </div>
                                        <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <ZoomInIcon className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Regular Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {(activeCategory === 'All' && galleryItems.length >= 2 ? filtered.slice(2) : filtered).map((item, i) => {
                                const realIndex = activeCategory === 'All' && galleryItems.length >= 2 ? i + 2 : filtered.indexOf(item);
                                return (
                                    <div
                                        key={item.id}
                                        className="relative group overflow-hidden rounded-xl cursor-pointer h-56"
                                        onClick={() => openLightbox(realIndex)}
                                    >
                                        <img
                                            src={item.thumb}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <span className="text-xs bg-secondary-500/80 text-white px-2 py-0.5 rounded-full mb-1 inline-block">{item.category}</span>
                                            <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                                        </div>
                                        <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <ZoomInIcon className="h-3.5 w-3.5 text-white" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filtered.length === 0 && (
                            <div className="text-center py-24 text-gray-500">No photos in this category yet.</div>
                        )}
                    </>
                )}
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-primary-900 to-gray-900 border-t border-white/10 py-16 text-center px-4">
                <h2 className="text-3xl font-extrabold text-white mb-3">Want to be part of our story?</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                    Join our team or partner with us — and one day your photo might be in this gallery too.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg"
                    >
                        Get in Touch <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                    <Link
                        to="/our-services"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
                    >
                        View Our Services
                    </Link>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    items={filtered}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={prevPhoto}
                    onNext={nextPhoto}
                />
            )}
        </div>
    );
};

export default GalleryPage;
