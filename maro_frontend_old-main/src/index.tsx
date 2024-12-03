import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './components/Error/ErrorFallback.tsx'
import { LanguageProvider } from './components/Language.tsx'
import { PropertyProvider } from './API/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PropertyProvider>
        <App />
        </PropertyProvider>
      </ErrorBoundary>
    </LanguageProvider>
  </React.StrictMode>
)
