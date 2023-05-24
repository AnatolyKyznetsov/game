import React, { useState } from 'react'
import { ParticipantItem } from '../components/ParticipantItem'
import { ParticipantProps } from '../interfaces'
import { Link } from 'react-router-dom'
import { Paths } from '../utils/paths'
import { tempLeaders } from '../utils/constants';

export function LeaderBoardPage() {
    const [ leaders, setLeaders ] = useState(tempLeaders);
    function getLeaders(participants: ParticipantProps[]) {
        return participants.map(participant =>
            <ParticipantItem id={participant.id} name={participant.name}
                time={participant.time} level={participant.level}/>)
    }

    return (
        <main className={'main'}>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Таблица лидеров
                    </div>
                    <div className='shape__participant-title'>
                        <div className='text text__big shape__leaders'>Имя</div>
                        <div className='text text__big shape__leaders'>Время</div>
                        <div className='text text__big shape__leaders'>Уровень</div>
                    </div>
                    {getLeaders(leaders)}
                    <Link to={Paths.main} className='link shape__link'>Назад к игре</Link>
                </div>
            </div>
        </main>
    )
}
