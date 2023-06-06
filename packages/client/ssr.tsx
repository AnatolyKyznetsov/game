import React from 'react'
import { App } from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server';
import { ErrorBoundary } from '../client/src/components/ErrorBoundary'
import { store } from './src/store/store'

export function render(url: string) {
    return renderToString(
        <React.StrictMode>
            <ErrorBoundary>
                <StaticRouter location={url}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </StaticRouter>
            </ErrorBoundary>
        </React.StrictMode>
    )
}
