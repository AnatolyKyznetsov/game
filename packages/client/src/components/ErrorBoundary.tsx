import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Ошибка:', error, errorInfo)
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <h1>Что-то пошло не так.</h1>
        }
        const { children } = this.props

        return children
    }
}
