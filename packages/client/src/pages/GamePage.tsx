import React, { useEffect, useRef, useState } from 'react';
import { Game } from '../engine/Game';

export const GamePage = () => {
    let game: Game | null = null;
    let ctx: CanvasRenderingContext2D | null = null;

    const [ size, setSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refSpriteEric = useRef<HTMLImageElement>(null);

    const init = () => {
        if (!refCanvas.current || !refSpriteEric.current) {
            return false;
        }

        setSize({ width: window.innerWidth, height: window.innerHeight });

        ctx = refCanvas.current.getContext('2d');
        game = new Game(size.width, size.height, refSpriteEric.current);

        animate();
    }

    const animate = () => {
        if (!game || ! ctx) {
            return false;
        }

        ctx.clearRect(0, 0, size.width, size.height);
        game.update();

        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    useEffect(() => {
        window.addEventListener('load', init);
        window.addEventListener('resize', init);

        return () => {
            window.removeEventListener('load', init);
            window.removeEventListener('resize', init);
        }
    }, [ size ]);

    return (
        <div>
            <canvas ref={refCanvas} width={size.width} height={size.height}>
                Необходимо включить поддержку JavaScript в вашем браузере
            </canvas>

            <img ref={refSpriteEric} src='/images/sprites/eric.png' alt='' className='hidden' />
        </div>
    )
}
