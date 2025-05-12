import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import App_State from './context/App_State.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <App_State>
    <App />
  </App_State>,
)
