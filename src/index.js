import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
// import * as serviceWorker from './serviceWorker'
import { Store, StoreProvider } from './context/store/storeContext'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

// serviceWorker.unregister();