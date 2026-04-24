import { Building2, Users, Wallet } from 'lucide-react';

export default function OwnerView() {
  return (
    <div className="space-y-6">
      <div className="bg-yk-cherry/10 border border-yk-cherry/20 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Ringkasan Properti Anda</h2>
        <p className="text-slate-400 text-sm">Kelola kamar, pantau penyewa, dan cek pendapatan bulan ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nanti data di bawah ini diambil dari API BFF Web */}
        <Card icon={<Building2 />} title="Total Kamar" value="15 Unit" />
        <Card icon={<Users />} title="Penyewa Aktif" value="12 Orang" />
        <Card icon={<Wallet />} title="Pendapatan (Bulan ini)" value="Rp 18.000.000" />
      </div>
    </div>
  );
}

// Komponen kecil untuk Card
function Card({ icon, title, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center gap-4">
      <div className="p-3 bg-white/10 rounded-lg text-yk-cherry">{icon}</div>
      <div>
        <p className="text-slate-400 text-xs font-medium">{title}</p>
        <p className="text-white font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}