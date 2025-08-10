import React from 'react'
import ReactDOM from 'react-dom/client'
import Button from './components/Button'
import Counter from './components/Counter'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Remote Application</h1>
      <p>This is the remote application running on port 4001</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Button Component</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="primary" onClick={() => alert('Primary clicked!')}>
            Primary
          </Button>
          <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
            Secondary
          </Button>
          <Button variant="danger" onClick={() => alert('Danger clicked!')}>
            Danger
          </Button>
        </div>
      </div>

      <div>
        <h2>Counter Component</h2>
        <Counter initialValue={0} step={1} />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)