interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning';
}

export function ProgressBar({
  value,
  max,
  label,
  showPercentage = true,
  size = 'md',
  variant = 'primary',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const gradients = {
    primary: 'var(--gradient-primary)',
    success: 'var(--gradient-success)',
    warning: 'linear-gradient(135deg, rgb(var(--warning)) 0%, rgb(var(--warning-light)) 100%)',
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2 text-sm">
          {label && (
            <span style={{ color: 'rgb(var(--text-secondary))' }} className="font-medium">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full overflow-hidden ${heightClasses[size]}`}
        style={{ background: 'rgb(var(--surface-2))' }}
      >
        <div
          className={`${heightClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{
            width: `${percentage}%`,
            background: gradients[variant]
          }}
        />
      </div>
    </div>
  );
}
