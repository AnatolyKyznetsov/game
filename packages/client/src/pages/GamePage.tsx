import React, { useEffect, useRef, useState } from 'react'
import { Game } from '../engine/Game'
import { PlayersStatus } from '../components/PlayersStatus'
import { Player } from '../engine/Player'
import lvl_1 from '../lvlMaps/lvl_1.json'

export const GamePage = () => {
    let game: Game | null = null
    const [ stopTimer, setStopTimer ] = useState(false)
    const [ players, setPlayers ] = useState<Player[]>([])
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const lvls = [ lvl_1 ]

    const init = () => {
        if (!refCanvas.current || game) {
            return
        }

        const ctx = refCanvas.current.getContext('2d')
        game = new Game(ctx as CanvasRenderingContext2D, lvls)

        game.eventBus.on('update', () => {
            setPlayers([ ...game!.players ])
        })

        game.eventBus.on('gameOver', () => {
            setStopTimer(true)
        })

        game.eventBus.emit('update')

        let last = performance.now()

        const animate = (now: number) => {
            const delay = now - last
            last = now

            game!.draw(delay)

            requestAnimationFrame(animate)
        }

        animate(0)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div>
            <canvas
                ref={refCanvas}
                width={window.innerWidth}
                height={window.innerHeight}>
                Необходимо включить поддержку JavaScript в вашем браузере
            </canvas>
            <PlayersStatus players={players} stopTimer={stopTimer} />
        </div>
    )
}
