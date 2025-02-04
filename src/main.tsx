import './index.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './redux/store'

const components = (
    <StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </Provider>
    </StrictMode>
)

const rootElement = document.querySelector('#root')

rootElement && ReactDOM.createRoot(rootElement).render(components)
