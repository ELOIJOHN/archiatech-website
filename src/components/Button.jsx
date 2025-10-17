import React from "react";

export default function Button({ 
  label, 
  variant = "solid", 
  size = "md",
  icon = null,
  onClick = null,
  href = null,
  className = "",
  ...props 
}) {
  // Utilisation des classes CSS globales ArchiAtech
  const variantClasses = {
    solid: "btn-archiatech",
    outline: "btn-archiatech-outline",
    ghost: "btn-archiatech-ghost"
  };
  
  const sizeClasses = {
    sm: "btn-archiatech-sm",
    md: "",
    lg: "btn-archiatech-lg"
  };

  const baseClasses = "inline-flex items-center justify-center gap-2";
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {label}
    </button>
  );
}
