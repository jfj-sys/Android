// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // 1. 引入

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. 用BrowserRouter包裹App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
