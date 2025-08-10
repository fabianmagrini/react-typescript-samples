declare module 'remote/Button' {
  import React from 'react'
  
  interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger'
    onClick?: () => void
    children: React.ReactNode
  }
  
  const Button: React.FC<ButtonProps>
  export default Button
}

declare module 'remote/Counter' {
  import React from 'react'
  
  interface CounterProps {
    initialValue?: number
    step?: number
  }
  
  const Counter: React.FC<CounterProps>
  export default Counter
}