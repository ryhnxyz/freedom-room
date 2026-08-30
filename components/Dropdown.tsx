'use client';

import React, {
  type FC,
  type ReactNode,
  isValidElement,
  useCallback,
} from 'react';
import {
  Button as AriaButton,
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Separator as AriaSeparator,
  type ButtonProps as AriaButtonProps,
  type MenuItemProps as AriaMenuItemProps,
  type MenuItemRenderProps,
  type MenuProps as AriaMenuProps,
  type PopoverProps as AriaPopoverProps,
  type SeparatorProps as AriaSeparatorProps,
} from 'react-aria-components';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { cx } from '@/utils/cx';

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
 * Dropdown Item Component
 * -----------------------------------------------------------------------------------------------*/
export interface DropdownItemProps extends AriaMenuItemProps {
  label?: string;
  addon?: string;
  icon?: string | FC<{ className?: string }> | ReactNode;
  avatarUrl?: string;
  variant?: 'default' | 'destructive';
  selectionIndicator?: 'checkmark' | 'checkbox' | 'radio' | 'none';
  children?: ReactNode | ((state: MenuItemRenderProps) => ReactNode);
}

export function DropdownItem({
  label,
  addon,
  icon,
  avatarUrl,
  variant = 'default',
  selectionIndicator = 'checkmark',
  children,
  className,
  ...props
}: DropdownItemProps) {
  const SelectionIndicator = useCallback(
    (state: MenuItemRenderProps) => {
      if (selectionIndicator === 'checkmark') {
        return (
          <Icon
            icon="solar:check-read-bold"
            className={cx(
              'w-4 h-4 shrink-0 text-brand transition-opacity',
              state.isSelected ? 'opacity-100' : 'opacity-0'
            )}
          />
        );
      }
      if (selectionIndicator === 'checkbox') {
        return (
          <div
            className={cx(
              'w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0',
              state.isSelected
                ? 'bg-brand border-brand text-white'
                : 'border-border-subtle bg-surface'
            )}
          >
            {state.isSelected && <Icon icon="solar:check-bold" className="w-3 h-3" />}
          </div>
        );
      }
      if (selectionIndicator === 'radio') {
        return (
          <div
            className={cx(
              'w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0',
              state.isSelected
                ? 'border-brand'
                : 'border-border-subtle bg-surface'
            )}
          >
            {state.isSelected && <div className="w-2 h-2 rounded-full bg-brand" />}
          </div>
        );
      }
      return null;
    },
    [selectionIndicator]
  );

  return (
    <AriaMenuItem
      {...props}
      textValue={label || (typeof children === 'string' ? children : undefined)}
      className={(state) =>
        cx(
          'group block cursor-pointer px-1 py-0.5 outline-none select-none',
          state.isDisabled && 'cursor-not-allowed opacity-50',
          typeof className === 'function' ? className(state) : className
        )
      }
    >
      {(state) => (
        <div
          className={cx(
            'relative flex items-center justify-between rounded-lg px-2.5 py-2 text-xs sm:text-sm font-medium transition-colors duration-100 outline-none',
            variant === 'destructive'
              ? 'text-red-700 hover:bg-red-50 focus:bg-red-50'
              : 'text-primary hover:bg-sand-100 focus:bg-sand-100',
            state.isFocused && (variant === 'destructive' ? 'bg-red-50' : 'bg-sand-100'),
            state.isSelected && 'font-semibold'
          )}
        >
          {/* Left Slot: Avatar / Icon / Label */}
          <div className="flex items-center gap-2.5 min-w-0">
            {state.selectionMode !== 'none' && !avatarUrl && !icon && (
              <SelectionIndicator {...state} />
            )}

            {avatarUrl && (
              <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-border-subtle">
                <Image src={avatarUrl} alt={label || 'Avatar'} fill sizes="20px" className="object-cover" />
              </div>
            )}

            {icon && (
              <span
                className={cx(
                  'shrink-0 text-secondary group-hover:text-primary transition-colors',
                  variant === 'destructive' && 'text-red-600 group-hover:text-red-700'
                )}
              >
                {renderIcon(icon, 'w-4 h-4')}
              </span>
            )}

            <span className="truncate">
              {label || (typeof children === 'function' ? children(state) : children)}
            </span>
          </div>

          {/* Right Slot: Addon / Shortcut / Submenu / Indicator */}
          <div className="flex items-center gap-2 shrink-0 ml-2">
            {addon && (
              <span className="text-[10px] font-mono text-muted tracking-wider bg-sand-200/80 px-1.5 py-0.5 rounded">
                {addon}
              </span>
            )}

            {state.selectionMode !== 'none' && (avatarUrl || icon) && (
              <SelectionIndicator {...state} />
            )}

            {state.hasSubmenu && (
              <Icon
                icon="akar-icons:arrow-right"
                className="w-3.5 h-3.5 text-muted ml-auto"
              />
            )}
          </div>
        </div>
      )}
    </AriaMenuItem>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dropdown Menu Container
 * -----------------------------------------------------------------------------------------------*/
export interface DropdownMenuProps<T extends object> extends AriaMenuProps<T> {}

export function DropdownMenu<T extends object>({
  className,
  ...props
}: DropdownMenuProps<T>) {
  return (
    <AriaMenu
      {...props}
      className={(state) =>
        cx(
          'outline-none py-1 space-y-0.5',
          typeof className === 'function' ? className(state) : className
        )
      }
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dropdown Popover
 * -----------------------------------------------------------------------------------------------*/
export interface DropdownPopoverProps extends AriaPopoverProps {}

export function DropdownPopover({
  placement = 'bottom end',
  className,
  children,
  ...props
}: DropdownPopoverProps) {
  return (
    <AriaPopover
      placement={placement}
      offset={4}
      {...props}
      className={({ isEntering, isExiting }) =>
        cx(
          'z-50 w-56 sm:w-64 max-h-80 overflow-y-auto rounded-xl bg-surface p-1 shadow-lg border border-border-subtle ring-1 ring-black/5 no-scrollbar',
          isEntering && 'animate-in fade-in zoom-in-95 duration-150 ease-out',
          isExiting && 'animate-out fade-out zoom-out-95 duration-100 ease-in',
          typeof className === 'function' ? className({ isEntering, isExiting } as any) : className
        )
      }
    >
      {children}
    </AriaPopover>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dropdown Separator
 * -----------------------------------------------------------------------------------------------*/
export function DropdownSeparator({
  className,
  ...props
}: AriaSeparatorProps) {
  return (
    <AriaSeparator
      {...props}
      className={cx('my-1 h-px w-full bg-border-subtle', className)}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dropdown Section & Header
 * -----------------------------------------------------------------------------------------------*/
export function DropdownSectionHeader({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AriaHeader>) {
  return (
    <AriaHeader
      {...props}
      className={cx(
        'px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted',
        className
      )}
    >
      {children}
    </AriaHeader>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dropdown Dots Button Trigger
 * -----------------------------------------------------------------------------------------------*/
export function DropdownDotsButton({
  className,
  ...props
}: AriaButtonProps) {
  return (
    <AriaButton
      {...props}
      aria-label="Open menu"
      className={({ isPressed, isHovered, isFocusVisible }) =>
        cx(
          'p-2 rounded-lg text-secondary hover:text-primary hover:bg-sand-200/60 transition-colors duration-150 cursor-pointer outline-none',
          (isPressed || isHovered) && 'bg-sand-200/60 text-primary',
          isFocusVisible && 'ring-2 ring-brand',
          typeof className === 'function' ? className({ isPressed, isHovered, isFocusVisible } as any) : className
        )
      }
    >
      <Icon icon="solar:menu-dots-bold" className="w-5 h-5" />
    </AriaButton>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dropdown Compound Export
 * -----------------------------------------------------------------------------------------------*/
export const Dropdown = {
  Root: AriaMenuTrigger,
  Trigger: AriaButton,
  Popover: DropdownPopover,
  Menu: DropdownMenu,
  Item: DropdownItem,
  Section: AriaMenuSection,
  SectionHeader: DropdownSectionHeader,
  Separator: DropdownSeparator,
  DotsButton: DropdownDotsButton,
};

export default Dropdown;
