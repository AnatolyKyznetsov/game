import { Game } from '../Game';
import { Player } from '../Player';
import { Position } from '../interfaces';

export class Eric extends Player {
    constructor(game: Game, position: Position) {
        super(game, {
            x: position.x,
            y: position.y
        }, 'eric');

        this.spritePath = '/images/sprites/eric.png';
        this.avatarPos = '-4px 0';
        this.deadAvatar = '-4px -911px'
        this.maxSpeed += 1;

        this.armorPoints = 1;
    }

    protected firstAbility(): void {

    }

    protected secondAbility(): void {

    }
}
