import OwnerView from './components/OwnerView';
import SeekerView from './components/SeekerView';
import OwnerSidebar from '../../components/shared/OwnerSidebar';
import SeekerNavbar from '../../components/shared/SeekerNavbar';
import SeekerBottomNav from '../../components/shared/SeekerBottomNav';

export default function Dashboard() {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.clear(); 
    window.location.href = '/login';
  };

  // === RENDER UNTUK PEMILIK KOS (OWNER) ===
  if (user?.role === 'OWNER') {
    return (
      <div className="flex h-screen bg-[#051026] text-white overflow-hidden">
        <OwnerSidebar handleLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-1">Selamat Datang, {user?.fullName}!</h1>
              <p className="text-slate-400 text-sm">Berikut adalah ringkasan performa bisnis kos Anda hari ini.</p>
            </header>
            <OwnerView />
          </div>
        </main>
      </div>
    );
  }

  // === RENDER UNTUK PENCARI KOS (SEEKER) ===
  return (
    <div className="min-h-screen bg-[#051026] text-white">
      <SeekerNavbar user={user} handleLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 md:pb-8">
        <header className="mb-8 md:hidden">
          <h1 className="text-2xl font-bold text-white">Halo, {user?.fullName}!</h1>
          <p className="text-sm text-slate-400">Mau cari kos di mana hari ini?</p>
        </header>
        <SeekerView />
      </main>

      <SeekerBottomNav />
    </div>
  );
}