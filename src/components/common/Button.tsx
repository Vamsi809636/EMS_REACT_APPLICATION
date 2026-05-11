import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button = ({ children, className = '', variant = 'primary', ...props }: ButtonProps) => (
  <button className={`btn btn-${variant} ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
