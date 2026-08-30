'use client';

import React, {
  type FC,
  type Key,
  type ReactNode,
  createContext,
  useContext,
  isValidElement,
} from 'react';
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Popover as AriaPopover,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  type ListBoxItemProps as AriaListBoxItemProps,
  type SelectProps as AriaSelectProps,
} from 'react-aria-components';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { cx } from '@/utils/cx';

export type SelectSize = 'sm' | 'md' | 'lg';

interface SelectContextType {
  size: SelectSize;
}

const SelectContext = createContext<SelectContextType>({ size: 'md' });

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
 * Select Item Component
 * -----------------------------------------------------------------------------------------------*/
export interface SelectItemProps extends Omit<AriaListBoxItemProps, 'children' | 'id'> {
  id?: string | number;
  label: string;
  supportingText?: string;
  icon?: string | FC<{ className?: string }> | ReactNode;
  avatarUrl?: string;
  badge?: string;
  className?: string;
  children?: ReactNode;
}

export function SelectItem({
  id,
  label,
  supportingText,
  icon,
  avatarUrl,
  badge,
  className,
  children,
  ...props
}: SelectItemProps) {
  const { size } = useContext(SelectContext);

  const iconSizeClass = size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5';

  return (
    <AriaListBoxItem
      id={id}
      textValue={props.textValue || label}
      {...props}
      className={({ isFocused, isSelected, isDisabled }) =>
        cx(
          'group relative flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-colors duration-100 outline-none select-none',
          size === 'sm' && 'py-1.5 text-xs',
          size === 'lg' && 'py-2.5 text-sm',
          !isDisabled && isFocused && 'bg-sand-100 text-primary',
          !isDisabled && isSelected && 'bg-timber-50 text-timber-900 font-semibold',
          isDisabled && 'opacity-40 cursor-not-allowed',
          className
        )
      }
    >
      {({ isSelected }) => (
        <div className="flex items-center justify-between w-full gap-2">
          {/* Left Slot: Avatar / Icon / Label & Supporting Text */}
          <div className="flex items-center gap-2.5 min-w-0">
            {avatarUrl && (
              <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-border-subtle">
                <Image src={avatarUrl} alt={label} fill sizes="20px" className="object-cover" />
              </div>
            )}

            {!avatarUrl && icon && (
              <span className="text-secondary group-hover:text-primary transition-colors shrink-0">
                {renderIcon(icon, iconSizeClass)}
              </span>
            )}

            <div className="flex flex-col min-w-0">
              <span className="truncate leading-snug">{children || label}</span>
              {supportingText && (
                <span className="text-[11px] text-muted truncate font-normal leading-snug">
                  {supportingText}
                </span>
              )}
            </div>
          </div>

          {/* Right Slot: Badge & Checkmark */}
          <div className="flex items-center gap-2 shrink-0 ml-2">
            {badge && (
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sand-200 text-secondary">
                {badge}
              </span>
            )}

            <Icon
              icon="solar:check-read-bold"
              className={cx(
                'w-4 h-4 text-timber-700 transition-opacity',
                isSelected ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
        </div>
      )}
    </AriaListBoxItem>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Main Select Component
 * -----------------------------------------------------------------------------------------------*/
export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string;
  placeholder?: string;
  size?: SelectSize;
  icon?: string | FC<{ className?: string }> | ReactNode;
  hint?: string;
  errorMessage?: string;
  popoverClassName?: string;
  className?: string;
  children: ReactNode | ((item: T) => ReactNode);
}

const sizeConfig: Record<
  SelectSize,
  { trigger: string; icon: string; text: string }
> = {
  sm: {
    trigger: 'h-9 px-3 text-xs gap-2',
    icon: 'w-4 h-4',
    text: 'text-xs',
  },
  md: {
    trigger: 'h-10 px-3.5 text-xs sm:text-sm gap-2',
    icon: 'w-4.5 h-4.5',
    text: 'text-xs sm:text-sm',
  },
  lg: {
    trigger: 'h-11 px-4 text-sm sm:text-base gap-2.5',
    icon: 'w-5 h-5',
    text: 'text-sm sm:text-base',
  },
};

export function Select<T extends object>({
  label,
  placeholder = 'Select an option',
  size = 'md',
  icon,
  hint,
  errorMessage,
  popoverClassName,
  className,
  children,
  isDisabled,
  isRequired,
  ...props
}: SelectProps<T>) {
  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <SelectContext.Provider value={{ size }}>
      <AriaSelect
        {...props}
        isDisabled={isDisabled}
        isRequired={isRequired}
        className={cx('flex flex-col gap-1.5 w-full', className)}
      >
        {({ isOpen, isFocused, isInvalid }) => (
          <>
            {label && (
              <label className="text-xs font-semibold text-secondary flex items-center justify-between">
                <span>
                  {label}
                  {isRequired && <span className="text-amber-700 ml-0.5">*</span>}
                </span>
              </label>
            )}

            {/* Trigger Button */}
            <AriaButton
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              className={cx(
                'relative flex w-full cursor-pointer items-center justify-between rounded-xl bg-surface text-primary border border-border-subtle shadow-xs font-medium transition-all duration-150 ease-out outline-none select-none text-left',
                currentSize.trigger,
                'hover:bg-sand-50 hover:border-sand-500/60',
                (isFocused || isOpen) && 'border-brand ring-4 ring-brand/30/50 bg-surface',
                isInvalid && 'border-red-500 ring-4 ring-red-100',
                isDisabled && 'cursor-not-allowed opacity-50 bg-sand-100 border-border-subtle shadow-none'
              )}
            >
              <AriaSelectValue className={cx('truncate min-w-0 pr-2', currentSize.text)}>
                {({ selectedItem, selectedText, isPlaceholder }) => {
                  const itemProps = (selectedItem as any)?.props;
                  const itemAvatarUrl = itemProps?.avatarUrl;
                  const itemIcon = itemProps?.icon;
                  const itemLabel = (selectedItem as any)?.textValue || itemProps?.label || selectedText;

                  if (isPlaceholder) {
                    return (
                      <div className="flex items-center gap-2 min-w-0">
                        {icon && (
                          <span className="text-secondary shrink-0">
                            {renderIcon(icon, currentSize.icon)}
                          </span>
                        )}
                        <span className="text-muted truncate">{placeholder}</span>
                      </div>
                    );
                  }

                  return (
                    <div className="flex items-center gap-2 min-w-0">
                      {itemAvatarUrl ? (
                        <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-border-subtle">
                          <Image src={itemAvatarUrl} alt="" fill sizes="20px" className="object-cover" />
                        </div>
                      ) : itemIcon ? (
                        <span className="text-secondary shrink-0">
                          {renderIcon(itemIcon, currentSize.icon)}
                        </span>
                      ) : icon ? (
                        <span className="text-secondary shrink-0">
                          {renderIcon(icon, currentSize.icon)}
                        </span>
                      ) : null}

                      <span className="text-primary font-medium truncate">
                        {itemLabel}
                      </span>
                    </div>
                  );
                }}
              </AriaSelectValue>

              <Icon
                icon="solar:alt-arrow-down-bold"
                className={cx(
                  'w-4 h-4 text-secondary shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180 text-brand'
                )}
              />
            </AriaButton>

            {/* Popover Dropdown Panel */}
            <AriaPopover
              offset={4}
              className={({ isEntering, isExiting }) =>
                cx(
                  'z-50 min-w-[var(--trigger-width)] max-h-64 overflow-auto rounded-xl bg-surface p-1.5 shadow-lg border border-border-subtle ring-1 ring-black/5 no-scrollbar',
                  isEntering && 'animate-in fade-in zoom-in-95 duration-150 ease-out',
                  isExiting && 'animate-out fade-out zoom-out-95 duration-100 ease-in',
                  popoverClassName
                )
              }
            >
              <AriaListBox className="outline-none space-y-0.5">
                {children}
              </AriaListBox>
            </AriaPopover>

            {/* Hint or Error Message */}
            {errorMessage && isInvalid && (
              <p className="text-[11px] font-medium text-red-600 flex items-center gap-1">
                <Icon icon="solar:danger-triangle-bold" className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}

            {!isInvalid && hint && (
              <p className="text-[11px] text-muted leading-tight">{hint}</p>
            )}
          </>
        )}
      </AriaSelect>
    </SelectContext.Provider>
  );
}

Select.Item = SelectItem;

export default Select;
