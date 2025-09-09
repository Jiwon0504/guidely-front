import React, { forwardRef } from "react";

const Input = forwardRef(({ 
  className = "", 
  type = "text",
  placeholder = "",
  value,
  onChange,
  onKeyPress,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      disabled={disabled}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
