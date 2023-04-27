import { ParticipantProps } from '../interfaces'

export function ParticipantItem({ name, score }: ParticipantProps) {
    return (
        <div className={'shape__participant'}>
            <div className={'text text__big'}>{name}</div>
            <div className={'text text__big'}>{score}</div>
        </div>
    )
}
