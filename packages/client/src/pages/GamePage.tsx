import React, { useEffect, useRef } from 'react';
import { Game } from '../engine/Game';

export const GamePage = () => {
    const refCanvas = useRef<HTMLCanvasElement>(null);

    const init = () => {
        if (!refCanvas.current) {
            return;
        }

        const ctx = refCanvas.current.getContext('2d');
        const game = new Game(ctx as CanvasRenderingContext2D);

        let last = performance.now();

        const animate = (now: number) => {
            const delay = now - last;
            last = now;

            game.draw(delay);

            requestAnimationFrame(animate);
        }

        animate(0);
    }

    useEffect(() => {
        window.addEventListener('load', init);

        return () => {
            window.removeEventListener('load', init);
        }
    }, []);

    return (
        <canvas ref={refCanvas} width={window.innerWidth} height={window.innerHeight}>
            Необходимо включить поддержку JavaScript в вашем браузере
        </canvas>
    )
}
