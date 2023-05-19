import { Game } from './Game';
import { TurretsItem, PosAndSize, Position, Size } from './interfaces';

export class Bullet {
    private game: Game;
    private turret: TurretsItem;
    private position: Position;
    private velocity: number;
    private size: Size;
    public destroyed: boolean;
    private image: string;

    constructor(game: Game, turret: TurretsItem) {
        this.game = game;
        this.turret = turret;

        this.size = {
            width: this.turret.bullet.width,
            height: this.turret.bullet.height
        };

        this.position = this.getPosition();

        this.velocity = 10;
        this.destroyed = false;
        this.image = this.turret.bullet.image;
    }

    private getPosition(): Position {
        const position = { x: 0, y: 0 };

        switch(this.turret.direction) {
        case 'left':
            position.x = this.turret.x - this.size.width - this.turret.bullet.x;
            position.y = this.turret.y + this.turret.bullet.y;
            break;
        case 'right':
            position.x = this.turret.x + this.turret.width + this.turret.bullet.x;
            position.y = this.turret.y + this.turret.bullet.y;
            break;
        case 'up':
            position.y = this.turret.y - this.size.height - this.turret.bullet.y;
            position.x = this.turret.x + this.turret.width / 2 - this.size.width / 2;
            break;
        case 'down':
            position.y = this.turret.y + this.turret.height + this.turret.bullet.y;
            position.x = this.turret.x + this.turret.width / 2 - this.size.width / 2;
            break;
        }

        return position;
    }

    private flight(): void {
        if (this.destroyed) {
            return;
        }

        switch(this.turret.direction) {
        case 'left':
            this.position.x -= this.velocity;
            break;
        case 'right':
            this.position.x += this.velocity;
            break;
        case 'up':
            this.position.y -= this.velocity;
            break;
        case 'down':
            this.position.y += this.velocity;
            break;
        }
    }

    public draw(): void {
        if (this.destroyed) {
            return;
        }

        this.game.ctx.fillStyle = 'white';
        this.game.ctx.roundRect(10, 20, 150, 100, 0);
        this.game.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    public update(): void {
        this.flight();

        for (let i = 0; i < this.game.map.data.platforms.length; i++) {
            const block = this.game.map.data.platforms[i];

            if (this.collision(block)) {
                this.destroyed = true;
                break;
            }
        }

        for (let i = 0; i < this.game.players.length; i++) {
            const player = this.game.players[i];

            if (this.collision({ ...player.position, ...player.size })) {
                if (!this.destroyed && !player.isDead) {
                    this.destroyed = true;
                    player.getDamage(this.turret.damage);
                    break;
                }
            }
        }
    }

    private collision(block: PosAndSize) {
        return (
            this.position.y + this.size.height >= block.y &&
            this.position.y <= block.y + block.height &&
            this.position.x <= block.x + block.width &&
            this.position.x + this.size.width >= block.x
        )
    }
}
