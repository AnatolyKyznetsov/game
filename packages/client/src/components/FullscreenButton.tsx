import React, { useState, useEffect, useCallback } from 'react'

export function FullscreenButton() {
    const [ fullscreenOn, setFullScreenOn ] = useState(false);

    const toggleFullscreen = useCallback(
        () => {
            if (fullscreenOn) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        },
        [ fullscreenOn ]
    )

    const fullscreenState = () => {
        setFullScreenOn(document.fullscreenElement === document.documentElement)
    }

    useEffect(() => {
        document.addEventListener('fullscreenchange', fullscreenState);

        return () => {
            document.removeEventListener('fullscreenchange', fullscreenState);
        }
    }, []);

    if (document.fullscreenEnabled) {
        return (
            <button className='fullscreen-button' onClick={toggleFullscreen}>
                <img src={`/images/fullscreen-${fullscreenOn ? 'off' : 'on'}.svg`} alt="Полноэкранный режим." />
            </button>
        )
    }

    return null;
}
