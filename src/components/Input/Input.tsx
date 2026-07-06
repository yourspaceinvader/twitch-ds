import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

const wrapperSizeMap = {
  sm: 'h-[2.8rem] px-3 gap-1.5',
  md: 'h-[3.6rem] px-4 gap-2',
  lg: 'h-[4.4rem] px-5 gap-3',
}

const textSizeMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  /** Replaces helperText and applies error styling when set */
  error?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
      size = 'md',
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const hasError = Boolean(error)

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-text-base"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'flex items-center rounded-md border transition-colors',
            wrapperSizeMap[size],
            'bg-background-alt',
            hasError
              ? 'border-red focus-within:ring-2 focus-within:ring-red'
              : 'border-border-base focus-within:border-purple-9 focus-within:ring-2 focus-within:ring-purple-9',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          {leadingIcon && (
            <span className="shrink-0 text-text-alt flex items-center">
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'flex-1 h-full min-w-0 bg-transparent outline-none',
              'text-text-base placeholder:text-text-alt',
              'disabled:cursor-not-allowed',
              textSizeMap[size],
              className,
            )}
            {...props}
          />

          {trailingIcon && (
            <span className="shrink-0 text-text-alt flex items-center">
              {trailingIcon}
            </span>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn('text-xs', hasError ? 'text-red' : 'text-text-alt')}>
            {error ?? helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
