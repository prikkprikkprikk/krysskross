import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// No index.css import needed here if App.css handles everything

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)