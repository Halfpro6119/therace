import { LucideIcon } from 'lucide-react';

interface StatPillProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  variant?: 'primary' | 'success' | 'warning' | 'neutral';
}

export function StatPill({ icon: Icon, label, value, variant = 'primary' }: StatPillProps) {
  const variants = {
    primary: {
      background: 'rgb(var(--accent) / 0.1)',
      color: 'rgb(var(--accent))',
      border: '1px solid rgb(var(--accent) / 0.2)'
    },
    success: {
      background: 'rgb(var(--success) / 0.1)',
      color: 'rgb(var(--success))',
      border: '1px solid rgb(var(--success) / 0.2)'
    },
    warning: {
      background: 'rgb(var(--warning) / 0.1)',
      color: 'rgb(var(--warning))',
      border: '1px solid rgb(var(--warning) / 0.2)'
    },
    neutral: {
      background: 'rgb(var(--surface-2))',
      color: 'rgb(var(--text))',
      border: '1px solid rgb(var(--border))'
    },
  };

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl"
      style={variants[variant]}
    >
      <Icon size={18} />
      <div className="flex flex-col">
        <span className="text-xs font-medium opacity-75">{label}</span>
        <span className="text-base font-bold stat-number">{value}</span>
      </div>
    </div>
  );
}
