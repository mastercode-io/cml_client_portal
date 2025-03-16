"use client"

export function CustomButton({
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  className = "",
  onClick,
  children,
}) {
  const baseClasses = "button font-medium rounded-lg transition-all duration-200 flex items-center justify-center"

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white",
  }

  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-5 text-base",
    lg: "py-4 px-6 text-lg",
  }

  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`

  return (
    <button type={type} className={classes} disabled={disabled || isLoading} onClick={onClick}>
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  )
}

