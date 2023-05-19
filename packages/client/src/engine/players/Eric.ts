import { Game } from '../Game';
import { Player } from '../Player';
import { Position } from '../interfaces';

export class Eric extends Player {
    constructor(game: Game, position: Position) {
        super(game, {
            x: position.x,
            y: position.y,
            width: 72,
            height: 70
        });

        this.spritePath = '/images/sprites/eric.png';
        this.avatarPos = '-15px -7px';
        this.maxSpeed += 1;

        this.armorPoints = 1;
    }

    protected firstAbility(): void {

    }

    protected secondAbility(): void {

    }
}
