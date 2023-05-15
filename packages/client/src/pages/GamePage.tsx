import React, { useEffect, useRef, useState } from 'react';
import { Game } from '../engine/Game';

export const GamePage = () => {
    const refCanvas = useRef<HTMLCanvasElement>(null);
    let game: Game | null = null;

    const init = () => {
        if (!refCanvas.current || game) {
            return;
        }

        const ctx = refCanvas.current.getContext('2d');
        game = new Game(ctx as CanvasRenderingContext2D);

        let last = performance.now();

        const animate = (now: number) => {
            const delay = now - last;
            last = now;

            game!.draw(delay);

            requestAnimationFrame(animate);
        }

        animate(0);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <canvas ref={refCanvas} width={window.innerWidth} height={window.innerHeight}>
            Необходимо включить поддержку JavaScript в вашем браузере
        </canvas>
    )
}
