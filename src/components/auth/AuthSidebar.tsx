import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function AuthSidebar() {
  return (
    <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.15 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 10, ease: "easeOut" }} 
        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-50" 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-transparent"></div>
      
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
        <motion.div variants={fadeInUp}>
          <Link to="/" className="inline-block">
            <h2 className="text-4xl font-black tracking-tighter"><span className="text-white">Yuk</span><span className="text-orange-500">kos</span></h2>
          </Link>
        </motion.div>

        <div className="space-y-6 max-w-md">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wide border border-white/20 backdrop-blur-md">
            <CheckCircle2 size={14} className="text-green-400" /> Platform Manajemen Kost #1
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl font-black text-white leading-tight">Mulai Langkah <br /> Kemandirianmu.</motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-300 text-lg leading-relaxed">Bergabunglah dengan ribuan pengguna lainnya. Temukan kost idaman atau kelola properti Anda dengan cerdas dalam satu genggaman.</motion.p>
        </div>

        <motion.div variants={fadeInUp} className="text-slate-400 text-sm font-medium">© 2026 Yukkos by Mamalia Fullstack Team.</motion.div>
      </motion.div>
    </div>
  );
}