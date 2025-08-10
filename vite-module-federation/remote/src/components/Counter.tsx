import React, { useState } from 'react'

interface CounterProps {
  initialValue?: number
  step?: number
}

const Counter: React.FC<CounterProps> = ({ 
  initialValue = 0, 
  step = 1 
}) => {
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount(prev => prev + step)
  const decrement = () => setCount(prev => prev - step)
  const reset = () => setCount(initialValue)

  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  }

  const buttonStyle = {
    padding: '4px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px'
  }

  const countStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    minWidth: '40px',
    textAlign: 'center' as const
  }

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={decrement}>
        -
      </button>
      <span style={countStyle}>{count}</span>
      <button style={buttonStyle} onClick={increment}>
        +
      </button>
      <button style={buttonStyle} onClick={reset}>
        Reset
      </button>
    </div>
  )
}

export default Counter