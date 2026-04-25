import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, ArrowLeft, KeyRound, CheckCircle2, ShieldCheck } from 'lucide-react';

// --- VARIANT ANIMASI DENGAN TYPE VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } 
  }
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Integrasi dengan endpoint Forgot Password NestJS Anda
    console.log('Requesting password reset for:', email);
    
    // Simulasi loading selama 1.5 detik lalu tampilkan pesan sukses
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
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
          src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop" 
          alt="Yukkos Security" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-transparent"></div>
        
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
              <ShieldCheck size={14} className="text-blue-400" /> Keamanan Akun
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl font-black text-white leading-tight">
              Jangan <br /> Khawatir.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-300 text-lg leading-relaxed">
              Kami akan membantu Anda memulihkan akses ke akun Yukkos Anda dengan aman dan cepat.
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="text-slate-400 text-sm font-medium">
            © 2026 Yukkos by Mamalia Fullstack Team.
          </motion.div>
        </motion.div>
      </div>

      {/* === BAGIAN KANAN: FORM RESET PASSWORD === */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-[#F8F9FA] relative">
        
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

        <div className="max-w-md w-full mx-auto">
          
          {/* Tombol Kembali (Back to Login) */}
          {!isSuccess && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-yk-cherry transition-colors mb-8">
                <ArrowLeft size={16} /> Kembali ke Login
              </Link>
            </motion.div>
          )}

          {/* === KONDISI 1: STATE SUKSES (Email Terkirim) === */}
          {isSuccess ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center space-y-6"
            >
              <motion.div variants={fadeInUp} className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 size={48} className="text-green-500" />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl font-black text-slate-900 tracking-tight">Cek Email Anda</motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-500 leading-relaxed">
                Kami telah mengirimkan tautan untuk mengatur ulang kata sandi ke <br />
                <span className="font-bold text-slate-900">{email}</span>
              </motion.p>
              
              <motion.div variants={fadeInUp} className="pt-6">
                <Link to="/login" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-4 rounded-xl transition-all flex items-center justify-center shadow-lg hover:-translate-y-0.5 inline-block">
                  Kembali ke Halaman Login
                </Link>
              </motion.div>
              
              <motion.p variants={fadeInUp} className="text-sm text-slate-500 font-medium pt-4">
                Belum menerima email?{' '}
                <button 
                  onClick={() => setIsSuccess(false)} 
                  className="font-bold text-yk-cherry hover:underline"
                >
                  Coba kirim ulang
                </button>
              </motion.p>
            </motion.div>
          ) : (
            
          /* === KONDISI 2: STATE FORM INPUT === */
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <div className="w-12 h-12 bg-yk-cherry/10 rounded-2xl flex items-center justify-center mb-6 border border-yk-cherry/20">
                  <KeyRound size={24} className="text-yk-cherry" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Lupa Password?</h2>
                <p className="text-slate-500 mt-2">
                  Masukkan alamat email yang terdaftar pada akun Anda. Kami akan mengirimkan tautan untuk mereset kata sandi.
                </p>
              </motion.div>

              <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Terdaftar</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" required
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="johndoe@mail.com" 
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yk-cherry/20 focus:border-yk-cherry transition-all font-medium"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-yk-cherry hover:bg-yk-cherry/90 text-white font-bold p-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-yk-cherry/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Mengirim Tautan...' : 'Kirim Tautan Reset'}
                </button>
              </motion.form>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}