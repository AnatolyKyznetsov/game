import { useEffect, useState } from 'react'

type GamepadState = Gamepad | null

export const useGamepad = (): GamepadState => {
    const [ gamepad, setGamepad ] = useState<GamepadState>(null)

    useEffect(() => {
        const connectHandler = (event: GamepadEvent) => {
            const gamepad = event.gamepad
            console.log('Gamepad connected:', gamepad)
            setGamepad(gamepad)
        }

        const disconnectHandler = (event: GamepadEvent) => {
            const gamepad = event.gamepad
            console.log('Gamepad disconnected:', gamepad)
            setGamepad(null)
        }

        const updateHandler = () => {
            const gamepads = navigator.getGamepads()
            for (const gamepad of gamepads) {
                if (gamepad) {
                    console.log('Gamepad state:', gamepad)
                    setGamepad(gamepad)
                }
            }
        }

        window.addEventListener('gamepadconnected', connectHandler)
        window.addEventListener('gamepaddisconnected', disconnectHandler)

        const animationFrame = () => {
            updateHandler()
            requestAnimationFrame(animationFrame)
        }

        requestAnimationFrame(animationFrame)

        return () => {
            window.removeEventListener('gamepadconnected', connectHandler)
            window.removeEventListener('gamepaddisconnected', disconnectHandler)
        }
    }, [])

    return gamepad
}
