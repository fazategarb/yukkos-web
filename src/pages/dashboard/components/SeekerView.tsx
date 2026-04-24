import { Search, Heart, Clock } from 'lucide-react';

export default function SeekerView() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Eksplorasi Hunian</h2>
        <p className="text-slate-400 text-sm">Cari kos impianmu, simpan favorit, dan pantau status pengajuan sewa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nanti bagian ini bisa menampilkan kos rekomendasi dari API */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer min-h-[120px]">
          <Search className="w-6 h-6" />
          <span className="text-sm font-medium">Cari Kos Baru</span>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer min-h-[120px]">
          <Heart className="w-6 h-6 text-red-400" />
          <span className="text-sm font-medium">Kos Favorit (3)</span>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer min-h-[120px]">
          <Clock className="w-6 h-6 text-orange-400" />
          <span className="text-sm font-medium">Menunggu Konfirmasi</span>
        </div>
      </div>
    </div>
  );
}