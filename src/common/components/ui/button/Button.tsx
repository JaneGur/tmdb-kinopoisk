import type {ButtonHTMLAttributes, ReactNode} from 'react'
import styles from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
