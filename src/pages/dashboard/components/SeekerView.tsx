import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Star, Heart, ChevronRight, ChevronLeft,
  Sparkles, Clock, Map as MapIcon, LayoutGrid 
} from 'lucide-react';
import { formatRupiah, cn } from '../../../lib/utils';

// Data Dummy dengan multiple images untuk Carousel
const DUMMY_KOS = [
  { 
    id: 1, name: "Luxury Room Tembalang", price: 2100000, location: "Tembalang", rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d9568e?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ], 
    type: "CAMPUR", isPromoted: true 
  },
  { 
    id: 2, name: "Kost Putri Muslimah", price: 800000, location: "Pedurungan", rating: 4.7, 
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"], 
    type: "PUTRI", isPromoted: false 
  },
  { 
    id: 3, name: "Exclusive Male Residen", price: 1500000, location: "Banyumanik", rating: 4.8, 
    images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80"], 
    type: "PUTRA", isPromoted: false 
  },
  { 
    id: 4, name: "Green Garden Residence", price: 1250000, location: "Semarang Barat", rating: 4.6, 
    images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"], 
    type: "CAMPUR", isPromoted: true 
  },
  { 
    id: 5, name: "Omah Kost USM", price: 750000, location: "Tlogosari", rating: 4.5, 
    images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80"], 
    type: "PUTRA", isPromoted: false 
  },
  { 
    id: 6, name: "Sky View Apartment", price: 3500000, location: "Simpang Lima", rating: 5.0, 
    images: ["https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80"], 
    type: "CAMPUR", isPromoted: false 
  },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat Pagi ☀️";
  if (hour < 18) return "Selamat Siang 🌤️";
  return "Selamat Malam 🌙";
};

export default function SeekerView() {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-10 pb-20">
      
      {/* --- FLOATING TOGGLE VIEW (MAP/GRID) --- */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 md:bottom-10">
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
          className="flex items-center gap-3 bg-slate-900/90 text-white px-6 py-3.5 rounded-full border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-all active:scale-95 backdrop-blur-xl group"
        >
          {viewMode === 'grid' ? (
            <><MapIcon size={20} className="text-yk-cherry group-hover:rotate-12 transition-transform" /> <span className="font-bold text-sm">Lihat Peta</span></>
          ) : (
            <><LayoutGrid size={20} className="text-yk-cherry group-hover:rotate-12 transition-transform" /> <span className="font-bold text-sm">Lihat Daftar</span></>
          )}
        </button>
      </div>

      {/* --- SECTION 1: SEARCH & GREETING --- */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative">
        <div className="max-w-xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-yk-cherry mb-2 font-semibold"
          >
            <Sparkles size={18} />
            <span className="text-xs tracking-widest uppercase">{getGreeting()}</span>
          </motion.div>
          <h2 className="text-4xl font-black text-white leading-tight">
            Hunian Ternyaman <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yk-cherry to-orange-400">Untuk Masa Depanmu.</span>
          </h2>
        </div>
        
        <div className="flex-1 max-w-lg w-full relative">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yk-cherry transition-colors" />
            <input 
              type="text"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Cari area atau nama kos..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yk-cherry/50 focus:bg-white/10 transition-all shadow-2xl"
            />
          </div>

          {/* Search Popover (Simulasi) */}
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-3 bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-xl"
              >
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Pencarian Populer</p>
                <div className="space-y-2">
                  {['Dekat Kampus USM', 'Kos Putra AC', 'Tembalang Murah'].map(item => (
                    <button key={item} className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-lg text-sm text-slate-300 transition-colors">
                      <Clock size={14} /> {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- SECTION 2: VIEW MODES --- */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.section 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Quick Filter Pills */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {['Terdekat', 'Lagi Trend', 'Terbaru', 'Putri', 'Putra'].map((label) => (
                <button key={label} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-yk-cherry hover:text-white hover:border-yk-cherry transition-all whitespace-nowrap">
                  {label}
                </button>
              ))}
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              ) : (
                DUMMY_KOS.map((kos) => <PropertyCard key={kos.id} kos={kos} />)
              )}
            </div>
          </motion.section>
        ) : (
          <motion.div 
            key="map"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-[600px] w-full bg-white/5 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i13!2i4193!3i2690!2m3!1e0!2sm!3i633104595!3m8!2sid!3sUS!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover" />
            <MapPin size={48} className="text-yk-cherry mb-4 animate-bounce relative z-10" />
            <h3 className="text-xl font-bold text-white relative z-10">Peta Belum Tersedia</h3>
            <p className="text-slate-400 text-sm relative z-10">Integrasi Google Maps API akan ditambahkan pada tahap selanjutnya.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SECTION 3: BANNER PROMO --- */}
      {!loading && viewMode === 'grid' && (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
          <div className="relative z-10">
            <h4 className="text-3xl font-black text-white mb-3">Punya Properti Kos?</h4>
            <p className="text-blue-100 max-w-sm mb-8 leading-relaxed">Kelola kos Anda secara cerdas dan jangkau ribuan mahasiswa USM dalam satu genggaman.</p>
            <button className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0">Daftar Sebagai Pemilik</button>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <MapIcon size={300} />
          </div>
        </section>
      )}
    </div>
  );
}

// --- SUB-KOMPONEN: PROPERTY CARD DENGAN CAROUSEL ---
function PropertyCard({ kos }: { kos: any }) {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % kos.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + kos.images.length) % kos.images.length);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-yk-cherry/50 transition-all duration-500 shadow-lg hover:shadow-yk-cherry/10"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        {/* Image Display */}
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={kos.images[currentImg]} 
            alt={kos.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/051026/white?text=Gambar+Kos"; }}
          />
        </AnimatePresence>
        
        {/* Carousel Controls (Muncul saat Hover) */}
        {kos.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={prevImg} className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-yk-cherry"><ChevronLeft size={16}/></button>
            <button onClick={nextImg} className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-yk-cherry"><ChevronRight size={16}/></button>
          </div>
        )}

        {/* Carousel Indicators */}
        {kos.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {kos.images.map((_: any, i: number) => (
              <div key={i} className={cn("h-1.5 rounded-full transition-all shadow-sm", currentImg === i ? "w-6 bg-white" : "w-1.5 bg-white/40")} />
            ))}
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className={cn("px-3 py-1 rounded-lg text-[10px] font-black backdrop-blur-md border border-white/10", 
            kos.type === 'PUTRI' ? 'bg-pink-500/20 text-pink-300' : 
            kos.type === 'PUTRA' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
          )}>
            KOS {kos.type}
          </span>
          {kos.isPromoted && (
            <span className="px-3 py-1 bg-yk-cherry text-white rounded-lg text-[10px] font-black flex items-center gap-1 shadow-lg shadow-yk-cherry/30">
              <Sparkles size={10} /> PROMOTED
            </span>
          )}
        </div>

        <button className="absolute top-4 right-4 p-2.5 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-yk-cherry transition-all border border-white/10 z-10">
          <Heart size={18} />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-yk-cherry transition-colors">{kos.name}</h3>
            <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg border border-yellow-400/20">
              <Star size={12} fill="currentColor" />
              <span className="text-[10px] font-black text-yellow-400">{kos.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-sm">
            <MapPin size={14} className="text-yk-cherry" />
            <span className="truncate">{kos.location}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Per Bulan</p>
            <p className="text-xl font-black text-white">
              {formatRupiah(kos.price)}
            </p>
          </div>
          <button className="bg-yk-cherry/10 hover:bg-yk-cherry text-yk-cherry hover:text-white p-3 rounded-2xl transition-all border border-yk-cherry/20">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden animate-pulse">
      <div className="aspect-[16/11] bg-white/10" />
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-6 bg-white/10 rounded-lg w-3/4" />
          <div className="h-4 bg-white/10 rounded-lg w-1/2" />
        </div>
        <div className="h-14 bg-white/10 rounded-2xl w-full" />
      </div>
    </div>
  );
}