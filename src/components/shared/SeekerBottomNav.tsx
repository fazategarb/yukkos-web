import { Home, Search, Heart, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SeekerBottomNav() {
  const activeMenu = 'home';

  const navItems = [
    { id: 'home', label: 'Eksplor', icon: <Search size={24} /> },
    { id: 'saved', label: 'Favorit', icon: <Heart size={24} /> },
    { id: 'chat', label: 'Pesan', icon: <MessageSquare size={24} /> },
    { id: 'profile', label: 'Profil', icon: <Home size={24} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#051026]/90 backdrop-blur-xl border-t border-white/10 px-6 py-3 pb-safe">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = activeMenu === item.id;
          return (
            <Link 
              key={item.id} 
              to="/dashboard"
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-yk-cherry' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}