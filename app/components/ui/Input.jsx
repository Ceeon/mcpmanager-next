'use client';

import React from 'react';
import { cn } from '../../lib/utils';

// 输入框组件
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type || 'text'}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-gray-50 px-3 py-2 text-sm",
          "focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input }; 