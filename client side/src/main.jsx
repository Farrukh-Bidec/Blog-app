import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import store from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

let persistor = persistStore(store)
createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <App />
      </PersistGate>,
    </Provider>
  </BrowserRouter>
)
