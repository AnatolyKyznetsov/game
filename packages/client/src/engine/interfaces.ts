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

export interface Players<T> {
    eric: T,
    baelog: T,
    olaf: T
}

export interface LvlData {
    background: string,
    size: Size,
    startPoint: Position,
    playersPosition: Players<Position>,
    platforms: PosAndSize[];
    stairs: PosAndSize[];
}

export interface CameraBox extends PosAndSize {
    bottomIndent: number,
}

export interface PosAndSize extends Position, Size { }
