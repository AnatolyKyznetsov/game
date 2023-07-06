import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../assets/icons/Back'
import { Paths } from '../utils/paths'

export const ButtonBack = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(Paths.profile)
    }

    return (
        <button className="shape__back" onClick={handleBack}>
            <BackIcon />
        </button>
    )
}
