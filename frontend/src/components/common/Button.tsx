import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
  showArrow?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  showArrow = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles =
        'bg-gradient-to-r from-[#00D0FF] to-[#007BB8] hover:brightness-110 text-[#030213] font-bold tracking-wide shadow-[0_0_20px_rgba(0,208,255,0.3)] transition-all duration-200';
      break;
    case 'outline':
      variantStyles =
        'border border-[#0C6A6F] hover:border-[#00BBFF] bg-[#0A1A2F] text-white hover:text-[#00BBFF] font-semibold transition-all duration-200';
      break;
    case 'danger':
      variantStyles =
        'border border-red-500/50 bg-[#0A1A2F] text-red-400 hover:bg-red-500/10 hover:border-red-500 font-semibold transition-all duration-200';
      break;
  }

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && <ArrowRight className="w-5 h-5 ml-2 inline-block stroke-[2.5]" />}
    </button>
  );
};
