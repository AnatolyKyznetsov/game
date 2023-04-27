import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface ErrorPageProps {
    title: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ title }) => {
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
