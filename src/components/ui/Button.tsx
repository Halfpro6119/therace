import { ButtonHTMLAttributes, forwardRef } from 'react';
import { transitions } from '../../utils/designTokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, disabled, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 font-semibold
      rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    `;

    const variantStyles = {
      primary: 'bg-[rgb(var(--accent))] hover:bg-[rgb(var(--accent-hover))] text-white focus:ring-[rgb(var(--accent))] active:scale-95',
      secondary: 'bg-[rgb(var(--surface-2))] hover:bg-[rgb(var(--border))] text-[rgb(var(--text))] focus:ring-[rgb(var(--muted))] active:scale-95',
      ghost: 'hover:bg-[rgb(var(--surface-2))] text-[rgb(var(--text))] focus:ring-[rgb(var(--accent))] active:scale-95',
      destructive: 'bg-[rgb(var(--danger))] hover:opacity-90 text-white focus:ring-[rgb(var(--danger))] active:scale-95',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
