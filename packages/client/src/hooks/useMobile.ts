import React, { useEffect, useState } from 'react'

export const useMobile = () => {
    const [ isMobile, setIsMobile ] = useState(false)
    const [ landscapeMode, setLandscapeMode ] = useState(false)

    const isLandscapeMode = () => {
        setLandscapeMode(window.innerHeight < window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', isLandscapeMode)
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mi/i.test(navigator.userAgent))
        setLandscapeMode(window.innerHeight < window.innerWidth)

        return () => {
            window.removeEventListener('resize', isLandscapeMode)
        }
    }, [])

    return { isMobile, landscapeMode }
}
