'use client';

import React, {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext,
  isValidElement,
} from 'react';
import {
  ToggleButton as AriaToggleButton,
  ToggleButtonGroup as AriaToggleButtonGroup,
  type ToggleButtonGroupProps as AriaToggleButtonGroupProps,
  type ToggleButtonProps as AriaToggleButtonProps,
} from 'react-aria-components';
import { Icon } from '@iconify/react';
import { cx } from '@/utils/cx';

export type ButtonGroupSize = 'sm' | 'md' | 'lg';

interface ButtonGroupContextType {
  size: ButtonGroupSize;
  variant?: 'pill' | 'segmented';
}

const ButtonGroupContext = createContext<ButtonGroupContextType>({
  size: 'md',
  variant: 'segmented',
});

/* -------------------------------------------------------------------------------------------------
 * Helper: Resolve Icon
 * -----------------------------------------------------------------------------------------------*/
function renderIcon(icon: string | FC<{ className?: string }> | ReactNode, className: string) {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return <Icon icon={icon} className={className} />;
  }
  if (typeof icon === 'function') {
    const IconComp = icon as FC<{ className?: string }>;
    return <IconComp className={className} />;
  }
  if (isValidElement(icon)) {
    return icon;
  }
  return null;
}

/* -------------------------------------------------------------------------------------------------
 * Button Group Item Component
 * -----------------------------------------------------------------------------------------------*/
export interface ButtonGroupItemProps extends AriaToggleButtonProps {
  iconLeading?: string | FC<{ className?: string }> | ReactNode;
  iconTrailing?: string | FC<{ className?: string }> | ReactNode;
  badge?: string | number;
  className?: string;
  children?: ReactNode;
}

const itemSizeClasses: Record<ButtonGroupSize, { root: string; icon: string; text: string }> = {
  sm: {
    root: 'h-8 px-2.5 sm:px-3 text-xs gap-1.5',
    icon: 'w-3.5 h-3.5',
    text: 'text-xs',
  },
  md: {
    root: 'h-9 sm:h-10 px-3 sm:px-3.5 text-xs sm:text-sm gap-2',
    icon: 'w-4 h-4',
    text: 'text-xs sm:text-sm',
  },
  lg: {
    root: 'h-11 px-4 sm:px-4.5 text-sm sm:text-base gap-2.5',
    icon: 'w-4.5 h-4.5',
    text: 'text-sm sm:text-base',
  },
};

export function ButtonGroupItem({
  iconLeading,
  iconTrailing,
  badge,
  className,
  children,
  ...props
}: ButtonGroupItemProps) {
  const { size, variant } = useContext(ButtonGroupContext);
  const sizeConfig = itemSizeClasses[size] || itemSizeClasses.md;

  return (
    <AriaToggleButton
      {...props}
      className={({ isSelected, isFocused, isHovered, isDisabled }) =>
        cx(
          // Base layout
          'relative inline-flex items-center justify-center font-semibold select-none cursor-pointer transition-all duration-150 ease-out outline-none whitespace-nowrap',
          sizeConfig.root,

          // Segmented Style (Border merged)
          variant === 'segmented' && [
            'border border-border-subtle bg-surface text-secondary',
            'first:rounded-l-lg last:rounded-r-lg',
            'hover:bg-sand-50 hover:text-primary hover:z-10',
            isSelected && 'bg-brand text-white border-brand z-20 shadow-xs hover:bg-brand-hover hover:border-brand-hover hover:text-white',
            isFocused && 'z-30 ring-2 ring-brand/30 ring-offset-1',
          ],

          // Pill Style (Separate floating buttons)
          variant === 'pill' && [
            'rounded-lg border border-transparent text-secondary bg-transparent',
            'hover:bg-sand-200/60 hover:text-primary',
            isSelected && 'bg-surface text-primary border-border-subtle shadow-xs hover:bg-surface hover:text-primary',
            isFocused && 'ring-2 ring-brand/30 ring-offset-1',
          ],

          // Disabled State
          isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none shadow-none',

          className
        )
      }
    >
      {({ isSelected }) => (
        <>
          {iconLeading && renderIcon(iconLeading, sizeConfig.icon)}

          {children && <span>{children}</span>}

          {badge !== undefined && (
            <span
              className={cx(
                'ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none transition-colors',
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-sand-200 text-secondary'
              )}
            >
              {badge}
            </span>
          )}

          {iconTrailing && renderIcon(iconTrailing, sizeConfig.icon)}
        </>
      )}
    </AriaToggleButton>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Button Group Root Component
 * -----------------------------------------------------------------------------------------------*/
export interface ButtonGroupProps
  extends Omit<AriaToggleButtonGroupProps, 'orientation'> {
  size?: ButtonGroupSize;
  variant?: 'pill' | 'segmented';
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

export function ButtonGroup({
  size = 'md',
  variant = 'segmented',
  fullWidth = false,
  className,
  children,
  selectionMode = 'single',
  ...props
}: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={{ size, variant }}>
      <AriaToggleButtonGroup
        selectionMode={selectionMode}
        {...props}
        className={cx(
          'relative inline-flex items-center',
          variant === 'segmented' && '-space-x-px rounded-lg shadow-2xs',
          variant === 'pill' && 'p-1 bg-sand-200/60 rounded-xl gap-1 border border-border-subtle',
          fullWidth ? 'w-full grid grid-flow-col auto-cols-fr' : 'w-max',
          className
        )}
      >
        {children}
      </AriaToggleButtonGroup>
    </ButtonGroupContext.Provider>
  );
}

ButtonGroup.Item = ButtonGroupItem;

export default ButtonGroup;
