import React from 'react';

/**
 * CustomButton Component
 * 
 * A reusable button component with different variants and loading state.
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant ('primary', 'outline', 'text')
 * @param {string} props.type - Button type ('button', 'submit', 'reset')
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.isLoading - Whether to show loading state
 * @param {function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 */
export const CustomButton = ({
  variant = 'primary',
  type = 'button',
  disabled = false,
  isLoading = false,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    outline: 'border border-primary text-primary hover:bg-primary-light focus:ring-primary',
    text: 'text-primary hover:bg-primary-light focus:ring-primary',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2">Loading...</span>
          <svg className="animate-spin h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </>
      ) : (
        children
      )}
    </button>
  );
};
