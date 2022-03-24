import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import store from './store'
import { StoreProvider } from 'easy-peasy' // Easy Peasy v5 十分簡單狀態管理

// Router v6 版本
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

