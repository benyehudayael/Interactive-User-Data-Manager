import React from 'react'
import ReactDOM from 'react-dom/client'
import { StateProvider } from './StateContext';
import App from './App.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>,
)
