import { App } from './App'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

test('Example test', async () => {
    render(<BrowserRouter><App /></BrowserRouter>)
})
