import { cn } from '../../lib/utils';

interface RoleCardProps {
  type: 'SEEKER' | 'OWNER';
  currentRole: string;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
}

export default function RoleCard({ type, currentRole, onClick, icon, title }: RoleCardProps) {
  const isSelected = currentRole === type;
  const isSeeker = type === 'SEEKER';
  
  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all", 
        isSelected 
          ? (isSeeker ? "border-yk-cherry bg-yk-cherry/5 text-yk-cherry" : "border-orange-500 bg-orange-500/5 text-orange-600") 
          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
      )}
    >
      <div className={isSelected ? (isSeeker ? "text-yk-cherry" : "text-orange-600") : "text-slate-400"}>{icon}</div>
      <span className="font-bold text-sm">{title}</span>
    </button>
  );
}