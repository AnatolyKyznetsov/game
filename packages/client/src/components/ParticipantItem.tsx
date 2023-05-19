import { ParticipantProps } from '../interfaces'

export function ParticipantItem({ id, name, score }: ParticipantProps) {
    return (
        <div className='shape__participant' id={id}>
            <div className='text text__big'>{name}</div>
            <div className='text text__big'>{score}</div>
        </div>
    )
}
