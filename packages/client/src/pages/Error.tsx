import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface ErrorProps {
    title: string
}

export const Error: FC<ErrorProps> = ({ title }) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <main className="main">
            <h1 className="title__main">{title}</h1>
            <button className="button" onClick={handleBack}>
                Назад
            </button>
        </main>
    )
}
