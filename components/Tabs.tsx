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
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  type TabsProps as AriaTabsProps,
  type TabListProps as AriaTabListProps,
  type TabProps as AriaTabProps,
  type TabPanelProps as AriaTabPanelProps,
} from 'react-aria-components';
import { Icon } from '@iconify/react';
import { cx } from '@/utils/cx';

export type TabsVariant = 'underline' | 'pills' | 'segmented';
export type TabsSize = 'sm' | 'md' | 'lg';

interface TabsContextType {
  variant: TabsVariant;
  size: TabsSize;
}

const TabsContext = createContext<TabsContextType>({
  variant: 'underline',
  size: 'md',
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
 * Tab Component
 * -----------------------------------------------------------------------------------------------*/
export interface TabProps extends AriaTabProps {
  icon?: string | FC<{ className?: string }> | ReactNode;
  badge?: string | number;
  className?: string;
  children?: ReactNode;
}

export function Tab({
  icon,
  badge,
  className,
  children,
  ...props
}: TabProps) {
  const { variant, size } = useContext(TabsContext);

  const iconSizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <AriaTab
      {...props}
      className={({ isSelected, isFocused, isDisabled }) =>
        cx(
          // Base
          'group relative inline-flex items-center justify-center font-semibold select-none cursor-pointer transition-all duration-150 ease-out outline-none whitespace-nowrap',

          // Size configs
          size === 'sm' && 'text-xs gap-1.5',
          size === 'md' && 'text-xs sm:text-sm gap-2',
          size === 'lg' && 'text-sm sm:text-base gap-2.5',

          // Variant: Underline
          variant === 'underline' && [
            'py-3 border-b-2 border-transparent text-secondary hover:text-primary hover:border-sand-400',
            isSelected && 'text-brand border-brand font-bold hover:text-brand hover:border-brand',
            isFocused && 'ring-2 ring-brand/30 ring-offset-2 rounded-sm',
          ],

          // Variant: Pills
          variant === 'pills' && [
            'px-3.5 py-2 rounded-lg text-secondary bg-transparent hover:bg-sand-200/70 hover:text-primary',
            isSelected && 'bg-brand text-white shadow-xs font-bold hover:bg-brand hover:text-white',
            isFocused && 'ring-2 ring-brand/30 ring-offset-1',
          ],

          // Variant: Segmented Box
          variant === 'segmented' && [
            'px-3.5 py-1.5 rounded-md text-secondary transition-all',
            'hover:text-primary',
            isSelected && 'bg-surface text-primary shadow-xs font-bold',
            isFocused && 'ring-2 ring-brand/30 ring-offset-1',
          ],

          // Disabled
          isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none',

          className
        )
      }
    >
      {({ isSelected }) => (
        <>
          {icon && (
            <span
              className={cx(
                'shrink-0 transition-colors',
                variant === 'pills' && isSelected ? 'text-white' : 'text-secondary group-hover:text-primary',
                variant === 'underline' && isSelected && 'text-brand'
              )}
            >
              {renderIcon(icon, iconSizeClass)}
            </span>
          )}

          {children && <span>{children}</span>}

          {badge !== undefined && (
            <span
              className={cx(
                'text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none transition-colors',
                variant === 'pills' && isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-sand-200 text-secondary'
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </AriaTab>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Tab List Component
 * -----------------------------------------------------------------------------------------------*/
export interface TabListProps<T extends object> extends AriaTabListProps<T> {
  className?: string;
}

export function TabList<T extends object>({
  className,
  children,
  ...props
}: TabListProps<T>) {
  const { variant } = useContext(TabsContext);

  return (
    <AriaTabList
      {...props}
      className={cx(
        'flex items-center',
        variant === 'underline' && 'border-b border-border-subtle gap-6 sm:gap-8 overflow-x-auto no-scrollbar',
        variant === 'pills' && 'flex-wrap gap-2',
        variant === 'segmented' && 'p-1 bg-sand-200/70 rounded-lg border border-border-subtle gap-1 w-max overflow-x-auto no-scrollbar',
        className
      )}
    >
      {children}
    </AriaTabList>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Tab Panel Component
 * -----------------------------------------------------------------------------------------------*/
export interface TabPanelProps extends AriaTabPanelProps {
  className?: string;
}

export function TabPanel({
  className,
  children,
  ...props
}: TabPanelProps) {
  return (
    <AriaTabPanel
      {...props}
      className={cx('pt-4 outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg', className)}
    >
      {children}
    </AriaTabPanel>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Tabs Root Component
 * -----------------------------------------------------------------------------------------------*/
export interface TabsProps extends AriaTabsProps {
  variant?: TabsVariant;
  size?: TabsSize;
  className?: string;
  children?: ReactNode;
}

export function Tabs({
  variant = 'underline',
  size = 'md',
  className,
  children,
  ...props
}: TabsProps) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <AriaTabs {...props} className={cx('flex flex-col w-full', className)}>
        {children}
      </AriaTabs>
    </TabsContext.Provider>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
