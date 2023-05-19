import { Bullet } from './Bullet';
import { Game } from './Game';
import { TurretsItem } from './interfaces'

export class Turrets {
    private game: Game;
    private data: TurretsItem;
    private bullet: Bullet;
    private time: number;
    private delay: number;
    private image: string;

    constructor(game: Game, data: TurretsItem) {
        this.game = game;
        this.data = data;
        this.bullet = new Bullet(this.game, this.data);
        this.time = new Date().getTime();
        this.delay = 1200;
        this.image = this.data.image;
    }

    public draw(): void {
        this.game.ctx.fillStyle = 'magenta';
        this.game.ctx.fillRect(this.data.x, this.data.y, this.data.width, this.data.height);

        this.bullet.draw();
    }

    public update(): void {
        if (!this.game.closeToScope(this.data.x, this.data.y)) {
            return;
        }

        const now = new Date().getTime();

        if (this.time + this.delay < now) {
            this.bullet = new Bullet(this.game, this.data);
            this.time = now;
        }

        this.bullet.update();
    }
}
