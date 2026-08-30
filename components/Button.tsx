'use client';

import React, { forwardRef, isValidElement } from 'react';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { Icon } from '@iconify/react';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondary-gray'
  | 'tertiary'
  | 'ghost'
  | 'outline'
  | 'dark'
  | 'link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  color?: ButtonVariant; // Alias for variant
  size?: ButtonSize;
  icon?: string | ReactNode;
  iconPosition?: 'left' | 'right';
  iconLeading?: string | FC<{ className?: string }> | ReactNode;
  iconTrailing?: string | FC<{ className?: string }> | ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onPress?: () => void;
}

const sizeClasses: Record<ButtonSize, { root: string; icon: string }> = {
  sm: {
    root: 'h-9 px-3 py-2 text-xs font-semibold rounded-lg gap-1.5',
    icon: 'w-4 h-4 shrink-0',
  },
  md: {
    root: 'h-10 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg gap-2',
    icon: 'w-4.5 h-4.5 shrink-0',
  },
  lg: {
    root: 'h-11 px-4.5 py-2.5 text-sm font-semibold rounded-lg gap-2',
    icon: 'w-5 h-5 shrink-0',
  },
  xl: {
    root: 'h-12 px-5 py-3 text-base font-semibold rounded-xl gap-2.5',
    icon: 'w-5 h-5 shrink-0',
  },
  '2xl': {
    root: 'h-15 px-6 py-4 text-lg font-semibold rounded-xl gap-3',
    icon: 'w-6 h-6 shrink-0',
  },
};

const variantClasses: Record<ButtonVariant, string> = {
  // Timber Green Primary 900 -> 950 with inner top highlight
  primary:
    'bg-[#b39229] text-white border border-[#b39229] shadow-[0_1px_2px_rgba(15,31,25,0.12),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-[#0A0A0A] hover:border-[#0A0A0A] active:bg-[#0A0A0A] active:border-[#0A0A0A] focus-visible:ring-4 focus-visible:ring-[#E8DCB8]/60',

  // Sand Secondary
  secondary:
    'bg-[#F0EBE1] text-[#1A1A1A] border border-[#EAE5DC] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#FAF5E8] hover:text-[#b39229] hover:border-[#E8DCB8] active:bg-[#E8DCB8] active:text-[#0A0A0A] focus-visible:ring-4 focus-visible:ring-[#E8DCB8]/50',

  // White Outline / Secondary-Gray
  'secondary-gray':
    'bg-white text-[#1A1A1A] border border-[#EAE5DC] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F0EBE1] hover:text-[#b39229] hover:border-[#E8DCB8] active:bg-[#FAF5E8] active:text-[#0A0A0A] focus-visible:ring-4 focus-visible:ring-[#E8DCB8]/50',

  outline:
    'bg-white text-[#1A1A1A] border border-[#EAE5DC] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F0EBE1] hover:text-[#b39229] hover:border-[#E8DCB8] active:bg-[#FAF5E8] active:text-[#0A0A0A] focus-visible:ring-4 focus-visible:ring-[#E8DCB8]/50',

  // Ghost / Tertiary
  tertiary:
    'bg-transparent text-[#4A4A4A] hover:bg-[#FAF5E8]/60 hover:text-[#b39229] active:bg-[#FAF5E8] focus-visible:ring-4 focus-visible:ring-[#E8DCB8]/40',

  ghost:
    'bg-transparent text-[#4A4A4A] hover:bg-[#FAF5E8]/60 hover:text-[#b39229] active:bg-[#FAF5E8] focus-visible:ring-4 focus-visible:ring-[#E8DCB8]/40',

  // Dark Architectural
  dark:
    'bg-[#1A1A1A] text-white border border-[#1A1A1A] shadow-[0_1px_2px_rgba(0,0,0,0.15)] hover:bg-[#0A0A0A] hover:border-[#0A0A0A] active:bg-black focus-visible:ring-4 focus-visible:ring-gray-400/40',

  // Text Link
  link:
    'bg-transparent text-[#b39229] hover:text-[#0A0A0A] underline-offset-4 hover:underline p-0 h-auto font-semibold focus-visible:ring-2 focus-visible:ring-[#b39229]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      color = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      iconLeading,
      iconTrailing,
      fullWidth = false,
      isLoading = false,
      disabled = false,
      isDisabled = false,
      type = 'button',
      className = '',
      onClick,
      onPress,
      ...props
    },
    ref
  ) => {
    const activeVariant = variant || color || 'primary';
    const isButtonDisabled = disabled || isDisabled || isLoading;
    const sizeConfig = sizeClasses[size] || sizeClasses.md;
    const variantStyle = variantClasses[activeVariant] || variantClasses.primary;

    // Resolve leading & trailing icons
    const leadingIcon = iconLeading || (icon && iconPosition === 'left' ? icon : null);
    const trailingIcon = iconTrailing || (icon && iconPosition === 'right' ? icon : null);

    const renderIconElement = (ico: typeof leadingIcon) => {
      if (!ico) return null;
      if (typeof ico === 'string') {
        return <Icon icon={ico} className={sizeConfig.icon} />;
      }
      if (typeof ico === 'function') {
        const Comp = ico as FC<{ className?: string }>;
        return <Comp className={sizeConfig.icon} />;
      }
      if (isValidElement(ico)) {
        return ico;
      }
      return null;
    };

    const handleClick = () => {
      if (isButtonDisabled) return;
      if (onClick) onClick();
      if (onPress) onPress();
    };

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={isButtonDisabled}
        aria-disabled={isButtonDisabled}
        aria-busy={isLoading}
        className={`inline-flex items-center justify-center font-sans tracking-wide whitespace-nowrap transition-all duration-150 ease-out select-none cursor-pointer focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:pointer-events-none active:scale-[0.985] ${
          fullWidth ? 'w-full' : ''
        } ${sizeConfig.root} ${variantStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className={`animate-spin ${sizeConfig.icon}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          renderIconElement(leadingIcon)
        )}

        {children && <span>{children}</span>}

        {!isLoading && renderIconElement(trailingIcon)}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
