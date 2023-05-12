import { Game } from '../Game';
import { Player } from '../Player';
import { Position } from '../interfaces';

export class Baelog extends Player {
    constructor(game: Game, position: Position) {
        super(game, {
            x: position.x,
            y: position.y,
            width: 78,
            height: 87
        });

        this.spritePath = '/images/sprites/baelog.png';
    }

    protected firstAbility(): void {

    }

    protected secondAbility(): void {

    }
}
