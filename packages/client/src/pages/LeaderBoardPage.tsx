import React, { useState } from 'react'
import { ParticipantItem } from '../components/ParticipantItem'

export function LeaderBoardPage() {
    const [ leaders, setLeaders ] = useState([]);
    function getLeaders(participants: Record<string, string>[]) {
        return participants.map(participant => <ParticipantItem name={participant.name} score={participant.score} />)
    }

    return (
        <main className={'main'}>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Таблица лидеров
                    </div>
                    {getLeaders(leaders)}
                    <a href={'/'} className='link shape__link'>Назад к игре</a>
                </div>
            </div>
        </main>
    )
}
