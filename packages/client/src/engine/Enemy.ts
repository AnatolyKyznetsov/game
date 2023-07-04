import { Bullet } from './Bullet';
import { Game } from './Game';
import { EnemyItem, Position } from './interfaces'

export class Enemy {
    private game: Game;
    private data: EnemyItem;
    private bullet: Bullet;

    private imagePath: string;
    private imagePathBullet: string;
    private sprite?: CanvasImageSource;
    private imageBullet?: CanvasImageSource;

    private time: number;
    private delay: number;

    private isDead: boolean;

    private frameX: number;
    private frameY: number;

    private maxFrameX: number;

    private maxSpeed: number;

    private position: Position;
    private velocity: Position;

    private isDirectionRight: boolean;

    constructor(game: Game, data: EnemyItem) {
        this.game = game;
        this.data = data;

        this.position = { x: data.x , y: data.y };

        this.maxSpeed = 1.5;
        this.velocity = { x: 0, y: 0 }

        this.imagePath = this.data.image;
        this.sprite = this.game.loadImage(this.imagePath);

        this.imagePathBullet = this.data.bullet.image;

        this.isDirectionRight = true;

        this.imageBullet = this.game.loadImage(this.imagePathBullet);
        this.bullet = new Bullet(this.game, {
            ...this.data,
            direction: this.isDirectionRight ? 'right' : 'left',
        }, this.imageBullet);

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 0;

        this.time = new Date().getTime();
        this.delay = 1200;

        this.isDead = false;
    }

    private moving(): void {
        if (this.position.x > this.data.x + this.data.distance) {
            this.isDirectionRight = false;
        }

        if (this.position.x < this.data.x) {
            this.isDirectionRight = true;
        }

        this.velocity.x = this.maxSpeed;

        if (this.isDirectionRight) {
            this.position.x += this.velocity.x;
        } else {
            this.position.x -= this.velocity.x;
        }

        this.frameY = this.isDirectionRight ? 0 : 2;
        this.maxFrameX = 2;
    }

    private frameChange(): void {
        if (this.game.frameSettings.timer > this.game.frameSettings.interval * 1.25) {
            this.game.frameSettings.timer = 0;

            if (this.frameX < this.maxFrameX) {
                this.frameX++
            } else {
                if (!this.isDead) {
                    this.frameX = 0
                }
            }
        } else {
            this.game.frameSettings.timer += this.game.frameSettings.delay
        }
    }

    public draw(): void {
        if (!this.sprite) {
            return;
        }

        this.game.ctx.drawImage(
            this.sprite,
            this.data.width * this.frameX,
            this.data.height * this.frameY,
            this.data.width,
            this.data.height,
            this.position.x,
            this.position.y,
            this.data.width,
            this.data.height
        );

        this.bullet.draw();
    }

    public update(): void {
        this.moving();
        this.frameChange();

        if (!this.game.closeToScope(this.data.x, this.data.y)) {
            return;
        }

        const now = new Date().getTime();

        if (this.time + this.delay < now) {
            this.bullet = new Bullet(this.game, {
                ...this.data,
                x: this.position.x,
                y: this.position.y,
                direction: this.isDirectionRight ? 'right' : 'left',
            }, this.imageBullet);

            this.time = now;
        }

        this.bullet.update();
    }
}
