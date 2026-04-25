import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToastProps {
  popup: { show: boolean; type: 'success' | 'error' | string; message: string };
}

export default function Toast({ popup }: ToastProps) {
  return (
    <AnimatePresence>
      {popup.show && (
        <motion.div 
          initial={{ opacity: 0, y: -50, x: '-50%' }} 
          animate={{ opacity: 1, y: 0, x: '-50%' }} 
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={cn(
            "fixed top-10 left-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border min-w-[320px] max-w-[90vw]", 
            popup.type === 'success' ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
          )}
        >
          {popup.type === 'success' ? <CheckCircle2 size={24} className="shrink-0" /> : <AlertCircle size={24} className="shrink-0" />}
          <span className="font-bold text-sm">{popup.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}