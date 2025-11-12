import React from 'react';
import { NavLink } from 'react-router-dom';

import { cn } from '@/utils';

interface Props {
  to: string;
  icon: React.ReactNode;
  label: string;
  labelMobile: string;
  className?: string;
}

export const Navlink: React.FC<Props> = ({ to, icon, label, labelMobile, className }) => {
  const [isLinkActive, setIsLinkActive] = React.useState(false);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        if (isActive !== isLinkActive) {
          setIsLinkActive(isActive);
        }

        return cn(
          'flex flex-col gap-1 items-center w-full px-1 py-1.5 rounded-md text-body-xs underline-offset-2 duration-300',
          'md:py-2 md:px-2.5 max-lg:text-nowrap max-lg:text-center font-semibold lg:flex-row lg:text-body-base',
          'lg:gap-2 hover:lg:bg-secondary/80 hover:lg:scale-105',
          isActive ? 'lg:bg-secondary/80 lg:scale-105' : 'lg:bg-secondary/30',
          className,
        );
      }}
    >
      <div
        className={cn(
          'max-lg:bg-secondary/30 max-lg:p-2 max-lg:rounded-sm duration-200',
          isLinkActive
            ? 'max-lg:bg-secondary/80 max-lg:scale-105'
            : 'text-primary max-lg:bg-secondary/30',
        )}
      >
        {icon}
      </div>
      <span className="max-lg:hidden lg:inline-block">{label}</span>
      {labelMobile && <span className="lg:hidden">{labelMobile}</span>}
    </NavLink>
  );
};
