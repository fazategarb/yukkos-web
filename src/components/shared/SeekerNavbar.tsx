import { motion } from 'framer-motion';
import { LogOut, UserCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SeekerNavbar({ user, handleLogout }: { user: any, handleLogout: () => void }) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#051026]/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Yukkos */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center p-1">
              <img src="/logo-yukkos.svg" alt="Yukkos" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">Yukkos</span>
          </Link>

          {/* Menu Kanan (Desktop) */}
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white transition-colors relative p-2">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yk-cherry rounded-full"></span>
            </button>
            
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-bold text-white leading-none">{user?.fullName}</p>
                <p className="text-xs text-slate-400 mt-1">Pencari Kos</p>
              </div>
              <UserCircle size={32} className="text-slate-400" />
            </div>

            {/* Tombol Logout */}
              <button 
                onClick={() => {
                  handleLogout();
                }}
                className="ml-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 p-2 rounded-lg border border-transparent hover:border-red-500/30 transition-all"
                title="Keluar"
              >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}