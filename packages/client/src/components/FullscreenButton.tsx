import React, { useState, useEffect } from 'react'

export function FullscreenButton() {
    const [ fullscreenOn, setFullscreenOn ] = useState(false);
    const [ fullscreenEnabled, setfullscreenEnabled ] = useState(false);

    const toggleFullscreen = () => {
        if (fullscreenOn) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    const fullscreenState = () => {
        setFullscreenOn(document.fullscreenElement === document.documentElement)
    }

    useEffect(() => {
        setfullscreenEnabled(document.fullscreenEnabled)
        document.addEventListener('fullscreenchange', fullscreenState);

        return () => {
            document.removeEventListener('fullscreenchange', fullscreenState);
        }
    }, []);

    if (fullscreenEnabled) {
        return (
            <button className='round-button' onClick={toggleFullscreen}>
                <img src={`/images/fullscreen-${fullscreenOn ? 'off' : 'on'}.svg`} alt="Полноэкранный режим." />
            </button>
        )
    }

    return null;
}
