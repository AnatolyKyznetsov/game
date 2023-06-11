import { Game } from '../Game';
import { Player } from '../Player';
import { Position } from '../interfaces';

export class Baleog extends Player {
    constructor(game: Game, position: Position) {
        super(game, {
            x: position.x,
            y: position.y,
        }, 'baleog');

        this.spritePath = '/images/sprites/baleog.png';
        this.avatarPos = '-6px 3px';
        this.deadAvatar = '-6px -907px'

    }

    protected firstAbility(): void {

    }

    protected secondAbility(): void {

    }
}
