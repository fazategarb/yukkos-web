import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, Building2, Home } from 'lucide-react';
import { cn } from '../../lib/utils'; 
import { axiosInstance } from '../../lib/axios';

// Impor komponen yang sudah kita pecah
import Toast from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import AuthSidebar from '../../components/auth/AuthSidebar';
import RoleCard from '../../components/auth/RoleCard';

// 👇 3. Tambahkan : Variants di sini
const fadeInUp: Variants = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
};

// 👇 4. Tambahkan : Variants di sini
const staggerContainer: Variants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'SEEKER' | 'OWNER'>('SEEKER');
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({ show: false, type: 'success', message: '' });
  
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (popup.show) setPopup(prev => ({ ...prev, show: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPopup(prev => ({ ...prev, show: false }));

    try {
      await axiosInstance.post('/auth/register', { ...formData, role });
      setPopup({ show: true, type: 'success', message: 'Pendaftaran Berhasil! Mengalihkan ke login...' });
      setTimeout(() => navigate('/login'), 2500);
    } catch (error: any) {
      const backendError = error.response?.data?.message || error.message || 'Terjadi kesalahan sistem';
      const errorMsg = Array.isArray(backendError) ? backendError[0] : backendError;
      setPopup({ show: true, type: 'error', message: errorMsg });
      setTimeout(() => setPopup(prev => ({ ...prev, show: false })), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden relative">
      <Toast popup={popup} />
      
      {/* Sidebar Gambar */}
      <AuthSidebar />

      {/* Form Kanan */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-[#F8F9FA] relative h-screen overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:hidden mb-12 text-center">
          <Link to="/" className="inline-block"><h2 className="text-4xl font-black tracking-tighter"><span className="text-slate-900">Yuk</span><span className="text-orange-500">kos</span></h2></Link>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-md w-full mx-auto space-y-8 my-auto">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Daftar Akun</h2>
            <p className="text-slate-500 mt-2">Pilih peran Anda dan lengkapi data diri di bawah ini.</p>
          </motion.div>

          <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <RoleCard type="SEEKER" currentRole={role} onClick={() => setRole('SEEKER')} icon={<Home size={24} />} title="Pencari Kos" />
              <RoleCard type="OWNER" currentRole={role} onClick={() => setRole('OWNER')} icon={<Building2 size={24} />} title="Pemilik Kos" />
            </div>

            <div className="space-y-4">
              <Input label="Nama Lengkap" icon={<User size={18} />} type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" />
              <Input label="Email" icon={<Mail size={18} />} type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="johndoe@mail.com" />
              <Input label="Nomor WhatsApp" icon={<Phone size={18} />} type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="081234567890" />
              <Input label="Password" icon={<Lock size={18} />} isPassword name="password" value={formData.password} onChange={handleInputChange} placeholder="Minimal 8 karakter" />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 w-4 h-4 text-yk-cherry border-slate-300 rounded focus:ring-yk-cherry" />
              <span className="text-xs text-slate-500 leading-tight">Saya setuju dengan <Link to="#" className="font-bold text-yk-cherry hover:underline">Syarat & Ketentuan</Link> Yukkos.</span>
            </div>

            <button type="submit" disabled={isLoading} className={cn("w-full text-white font-bold p-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5", role === 'OWNER' ? "bg-orange-500 hover:bg-orange-600 shadow-orange-500/30" : "bg-yk-cherry hover:bg-yk-cherry/90 shadow-yk-cherry/30")}>
              {isLoading ? 'Memproses...' : <>Daftar Sekarang <ArrowRight size={18} /></>}
            </button>
          </motion.form>

          <motion.p variants={fadeInUp} className="text-center text-sm text-slate-500 font-medium">
            Sudah punya akun? <Link to="/login" className="font-bold text-slate-900 hover:text-yk-cherry transition-colors">Masuk di sini</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}