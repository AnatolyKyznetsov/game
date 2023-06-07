import React, { useState } from 'react'
import { ParticipantItem } from '../components/ParticipantItem'
import { ParticipantProps } from '../interfaces'
import { Link } from 'react-router-dom'
import { Paths } from '../utils/paths'
import { v4 as makeId } from 'uuid'
import { useAppSelector } from '../store/hooks';
import { selectLeaderboardData } from '../store/selectors/leaderboardSelectors';

export function LeaderBoardPage() {
    const leaderboard = useAppSelector(selectLeaderboardData);
    const [ leaders, setLeaders ] = useState(leaderboard);

    function getLeaders(participants: ParticipantProps[]) {
        return participants.map(participant =>
            <ParticipantItem key={makeId()} id={participant.id} name={participant.name}
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
                    <Link to={Paths.startScreen} className='link shape__link'>Назад к игре</Link>
                </div>
            </div>
        </main>
    )
}
