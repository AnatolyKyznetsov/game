import React, { useEffect, useState } from 'react'

export function Timer({ needStop }: Record<string, boolean>) {
    const [ seconds, setSeconds ] = useState(0);
    const [ time, setTime ] = useState('00:00');

    const addZero = (num: number) => {
        return String(num).length === 1 ? `0${num}` : num;
    }

    const convertTime = (second: number) => {
        const minutes = Math.floor(second / 60);
        const seconds = second % 60;
        setTime(`${addZero(minutes)}:${addZero(seconds)}`);
    }

    useEffect(() => {
        const interval = needStop ? 0 : setInterval(() => {
            setSeconds(second => {
                const next = second + 1;
                convertTime(next);
                return next;
            });
        }, 1000);

        if (needStop) {
            // time в лидерборд
        }

        return () => clearInterval(interval);
    }, [ needStop ])

    return (
        <div className='players__timer'>{time}</div>
    )
}
