import React, { ReactNode } from 'react'
import { Player } from '../engine/Player'
import { v4 as makeId } from 'uuid'

interface PlayersStatusItemProps {
    player: Player,
}

export function PlayersStatusItem({ player }: PlayersStatusItemProps ) {
    const creatHealPoints = (num: number) => {
        const content: ReactNode[] = [];

        for (let i = 0; i < num; i++) {
            content.push(<li key={makeId()} className="heal-points__item"></li>);
        }

        return content
    }

    return (
        <div className={`players__item ${player.isActivePlayer ? 'players__item_active' : ''}` }>
            <ul className="inventory">
                {/* inventory__item_focus */}
                <li className="inventory__item"></li>
                <li className="inventory__item"></li>
                <li className="inventory__item"></li>
                <li className="inventory__item"></li>
            </ul>
            <div className="players__inner">
                <div className="players__avatar" style={{
                    backgroundImage: `url("${player.spritePath}")`,
                    backgroundPosition: player.avatarPos
                }}></div>
                <ul className="heal-points">
                    {creatHealPoints(player.healPoints)}
                    {player.armorPoints === 1 ? <li className="heal-points__item heal-points__item_armor"></li> : ''}
                </ul>
            </div>
        </div>
    )
}