import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Wallet, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OwnerSidebar({ handleLogout }: { handleLogout: () => void }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const activeMenu = 'dashboard';

  const menuItems = [
    { id: 'dashboard', label: 'Beranda', icon: <LayoutDashboard size={20} /> },
    { id: 'properties', label: 'Properti Kos', icon: <Building2 size={20} /> },
    { id: 'tenants', label: 'Penyewa Aktif', icon: <Users size={20} /> },
    { id: 'finance', label: 'Laporan Keuangan', icon: <Wallet size={20} /> },
    { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-white/[0.02] border-r border-white/10 flex flex-col relative shrink-0 backdrop-blur-xl z-20"
    >
      {/* Tombol Collapse */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 bg-[#051026] border border-white/10 text-slate-400 hover:text-white hover:border-yk-cherry rounded-full p-1.5 transition-colors z-30 shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header / Logo */}
      <div className="p-6 flex items-center justify-center min-h-[88px] border-b border-white/5">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shadow-inner shrink-0 p-1.5">
            <img src="/logo-yukkos.svg" alt="Yukkos" className="w-full h-full object-contain" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-extrabold text-lg tracking-tight text-white whitespace-nowrap"
            >
              Juragan<span className="text-yk-cherry">Kos</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Menu Navigasi */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.id;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-yk-cherry/10 text-yk-cherry border border-yk-cherry/20 shadow-sm' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <div className="shrink-0">{item.icon}</div>
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group border border-transparent hover:border-red-500/20"
          title={isCollapsed ? "Keluar" : ''}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && (
            <span className="font-medium text-sm whitespace-nowrap">Keluar (Logout)</span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}