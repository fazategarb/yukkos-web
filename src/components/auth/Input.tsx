import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  isPassword?: boolean;
}

export default function Input({ label, icon, isPassword = false, ...props }: InputProps) {
  const [show, setShow] = useState(false);
  const type = isPassword ? (show ? 'text' : 'password') : props.type;

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <input 
          type={type} 
          required 
          className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yk-cherry/20 focus:border-yk-cherry transition-all font-medium" 
          {...props} 
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}