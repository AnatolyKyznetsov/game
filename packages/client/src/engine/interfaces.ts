import { RefObject } from 'react'

export interface Position {
    x: number,
    y: number,
}

export interface Size {
    width: number,
    height: number,
}

export interface Moving {
    left: boolean,
    right: boolean,
    up: boolean,
    down: boolean,
}

export interface Direction {
    direction: string
}

export interface Damage {
    damage: number
}

export interface Players<T> {
    eric: T,
    baleog: T,
    olaf: T,
}

export interface LvlData {
    background: string,
    size: Size,
    finishArea: PosAndSize,
    startPoint: Players<Position>,
    playersPosition: Players<Position>,
    platforms: PosAndSize[],
    stairs: PosAndSize[],
    turrets: TurretsItem[],
    enemies: EnemyItem[],
    traps: PosAndSize[],
    heals: HealsItem[],
}

export interface CameraBox extends PosAndSize {
    bottomIndent: number,
}

export interface BullestItem extends PosAndSize {
    image: string,
}

export interface TurretsItem extends Damage, Direction, Position, Size {
    bullet: BullestItem,
    image: string,
}

export interface EnemyItem extends Damage, Position, Size {
    bullet: BullestItem,
    image: string,
    distance: number,
}

export interface HealsItem extends Position, Size {
    image: string,
    type: string,
}

export interface PosAndSize extends Position, Size { }

export interface FrameSettings {
    delay: number,
    interval: number,
    timer: number
}

export interface Controls {
    right: RefObject<HTMLDivElement>,
    left: RefObject<HTMLDivElement>,
    down: RefObject<HTMLDivElement>,
    up: RefObject<HTMLDivElement>,
    next_player: RefObject<HTMLDivElement>,
    prev_player?: RefObject<HTMLDivElement>,
    first_ability: RefObject<HTMLDivElement>,
    second_ability?: RefObject<HTMLDivElement>
}
