import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import Login from './login'
import './stylesheets/index.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Login />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
