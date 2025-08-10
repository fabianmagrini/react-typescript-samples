import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  onClick, 
  children 
}) => {
  const baseStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  }

  const variantStyles = {
    primary: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#6c757d',
      color: 'white'
    },
    danger: {
      backgroundColor: '#dc3545',
      color: 'white'
    }
  }

  return (
    <button
      style={{
        ...baseStyle,
        ...variantStyles[variant]
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button