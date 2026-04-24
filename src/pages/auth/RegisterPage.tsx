import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // <-- Import Framer Motion
import { 
  User, Mail, Lock, Phone, ArrowRight, 
  Building2, Home, CheckCircle2, Eye, EyeOff
} from 'lucide-react';
import { cn } from '../../lib/utils'; 

// --- VARIANT ANIMASI ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } // Jeda antar elemen
  }
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'seeker' | 'owner'>('seeker');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering...', { ...formData, role });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      
      {/* === BAGIAN KIRI: BRANDING & GAMBAR (Sembunyi di Mobile) === */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden">
        {/* Gambar Latar Dianimasikan Zoom-out */}
        <motion.img 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop" 
          alt="Yukkos Premium" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-transparent"></div>
        
        {/* Wrapper Teks Kiri dengan Animasi Stagger */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 p-16 flex flex-col justify-between h-full w-full"
        >
          {/* Logo */}
          <motion.div variants={fadeInUp}>
            <Link to="/" className="inline-block">
              <h2 className="text-4xl font-black tracking-tighter">
                <span className="text-white">Yuk</span><span className="text-orange-500">kos</span>
              </h2>
            </Link>
          </motion.div>

          <div className="space-y-6 max-w-md">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wide border border-white/20 backdrop-blur-md">
              <CheckCircle2 size={14} className="text-green-400" />  Platform Manajemen dan Pencarian Kost #1
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl font-black text-white leading-tight">
              Mulai Langkah <br /> Kemandirianmu.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-300 text-lg leading-relaxed">
              Bergabunglah dengan ribuan pengguna lainnya. Temukan kost idaman atau kelola properti Anda dengan cerdas dalam satu genggaman.
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="text-slate-400 text-sm font-medium">
            © 2026 Yukkos by Mamalia Fullstack Team.
          </motion.div>
        </motion.div>
      </div>

      {/* === BAGIAN KANAN: FORM REGISTER === */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-[#F8F9FA] relative h-screen overflow-y-auto">
        
        {/* Logo untuk Mobile */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden mb-12 text-center"
        >
          <Link to="/" className="inline-block">
            <h2 className="text-4xl font-black tracking-tighter">
              <span className="text-slate-900">Yuk</span><span className="text-orange-500">kos</span>
            </h2>
          </Link>
        </motion.div>

        {/* Wrapper Form Kanan dengan Animasi Stagger */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-md w-full mx-auto space-y-8 my-auto"
        >
          
          {/* Header Form */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Daftar Akun</h2>
            <p className="text-slate-500 mt-2">Pilih peran Anda dan lengkapi data diri di bawah ini.</p>
          </motion.div>

          <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
            
            {/* Pilihan Role (Seeker / Owner) */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('seeker')}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                  role === 'seeker' 
                    ? "border-yk-cherry bg-yk-cherry/5 text-yk-cherry" 
                    : "border-slate-200 bg-white text-slate-500 hover:border-yk-cherry/30"
                )}
              >
                <Home size={24} className={role === 'seeker' ? "fill-yk-cherry/20" : ""} />
                <span className="font-bold text-sm">Pencari Kos</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                  role === 'owner' 
                    ? "border-orange-500 bg-orange-500/5 text-orange-600" 
                    : "border-slate-200 bg-white text-slate-500 hover:border-orange-500/30"
                )}
              >
                <Building2 size={24} className={role === 'owner' ? "fill-orange-500/20" : ""} />
                <span className="font-bold text-sm">Pemilik Kos</span>
              </button>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              {/* Nama Lengkap */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nama Lengkap</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleInputChange}
                    placeholder="John Doe" 
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yk-cherry/20 focus:border-yk-cherry transition-all font-medium"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" name="email" required
                    value={formData.email} onChange={handleInputChange}
                    placeholder="johndoe@mail.com" 
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yk-cherry/20 focus:border-yk-cherry transition-all font-medium"
                  />
                </div>
              </div>

              {/* Nomor Telepon */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nomor WhatsApp</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleInputChange}
                    placeholder="081234567890" 
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yk-cherry/20 focus:border-yk-cherry transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type={showPassword ? "text" : "password"} name="password" required
                    value={formData.password} onChange={handleInputChange}
                    placeholder="Minimal 8 karakter" 
                    className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yk-cherry/20 focus:border-yk-cherry transition-all font-medium"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Syarat & Ketentuan */}
            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 w-4 h-4 text-yk-cherry border-slate-300 rounded focus:ring-yk-cherry" />
              <span className="text-xs text-slate-500 leading-tight">
                Saya setuju dengan <Link to="#" className="font-bold text-yk-cherry hover:underline">Syarat & Ketentuan</Link> serta <Link to="#" className="font-bold text-yk-cherry hover:underline">Kebijakan Privasi</Link> Yukkos.
              </span>
            </div>

            {/* Tombol Submit */}
            <button 
              type="submit"
              className={cn(
                "w-full text-white font-bold p-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5",
                role === 'owner' ? "bg-orange-500 hover:bg-orange-600 shadow-orange-500/30" : "bg-yk-cherry hover:bg-yk-cherry/90 shadow-yk-cherry/30"
              )}
            >
              Daftar Sekarang <ArrowRight size={18} />
            </button>
          </motion.form>

          {/* Footer Form */}
          <motion.p variants={fadeInUp} className="text-center text-sm text-slate-500 font-medium">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-bold text-slate-900 hover:text-yk-cherry transition-colors">
              Masuk di sini
            </Link>
          </motion.p>
        </motion.div>

      </div>
    </div>
  );
}