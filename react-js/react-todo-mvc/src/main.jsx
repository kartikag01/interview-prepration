import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TodoApp from './TodoApp.js'
import TodoProvider from './components/TodoProvider.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  </React.StrictMode>,
)
