import React, { useState } from 'react'
import { ParticipantItem } from '../components/ParticipantItem'
import { ParticipantProps } from '../interfaces'
import { Link } from 'react-router-dom'
import { Paths } from '../utils/paths'

export function LeaderBoardPage() {
    const [ leaders, setLeaders ] = useState([]);
    function getLeaders(participants: ParticipantProps[]) {
        return participants.map(participant => <ParticipantItem id={participant.id} name={participant.name} score={participant.score} />)
    }

    return (
        <main className={'main'}>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Таблица лидеров
                    </div>
                    {getLeaders(leaders)}
                    <Link to={Paths.main} className='link shape__link'>Назад к игре</Link>
                </div>
            </div>
        </main>
    )
}
