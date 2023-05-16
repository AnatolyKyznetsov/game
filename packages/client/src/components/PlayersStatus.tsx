import React, { useState } from 'react'
import { Timer } from '../components/Timer';
import { Player } from '../engine/Player';
import { PlayersStatusItem } from './PlayersStatusItem';

export function PlayersStatus({ players }: Record<string, Player[]>) {
    const [ stopTimer, setStopTimer ] = useState(false);

    return (
        <div className='players'>

            <div className="players__wrapper">
                <div className="players__trash">
                    <img src="/images/trash.svg" alt="" />
                </div>
                {players.map(player => (
                    <PlayersStatusItem player={player} key={player.id} />
                ))}
            </div>
            <Timer needStop={stopTimer} />
        </div>
    )
}
