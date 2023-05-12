import { Game } from '../Game';
import { Player } from '../Player';
import { Position } from '../interfaces';

export class Olaf extends Player {
    constructor(game: Game, position: Position) {
        super(game, {
            x: position.x,
            y: position.y,
            width: 86,
            height: 78
        });

        this.spritePath = '/images/sprites/olaf.png';
    }

    protected firstAbility(): void {

    }

    protected secondAbility(): void {

    }
}
