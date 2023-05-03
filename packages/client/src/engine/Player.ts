import { Game } from './Game';

type Keys = string[];

export class Player {
    private game: Game;
    private width: number;
    private height: number;
    private posX: number;
    private posY: number;
    private speed: number;
    private maxSpeed: number;
    private velocity: number;
    private weight: number;
    private image: HTMLImageElement;

    constructor(game: Game) {
        this.game = game;
        this.width = 72;
        this.height = 72;
        this.posX = 0;
        this.posY = this.game.height - this.height;
        this.image = game.image;

        this.speed = 0;
        this.maxSpeed = 10;

        this.velocity = 0;
        this.weight = 1;
    }

    private move(keys: Keys) {
        const width = this.game.width - this.width;
        const height = this.game.height - this.height;

        if ((keys.includes('ArrowRight') || keys.includes('ArrowLeft')) && this.canMoveX()) {
            this.posX += this.speed;
        } else if ((keys.includes('ArrowUp') || keys.includes('ArrowDown')) && this.canMoveY()) {
            this.posY += this.speed;
        }

        if (keys.includes('ArrowRight') || keys.includes('ArrowDown')) {
            this.speed = this.maxSpeed;
        } else if (keys.includes('ArrowLeft') || keys.includes('ArrowUp')) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0;
        }

        if (this.posX < 0) {
            this.posX = 0;
        } else if (this.posY < 0) {
            this.posY = 0;
        }

        if (this.posX > width) {
            this.posX = width;
        } else if (this.posY > height) {
            this.posY = height;
        }
    }

    // private jump(keys: Keys) {
    //     if (keys.includes('ArrowUp') && this.onGround()) {
    //         this.velocity -= 20;
    //     }

    //     this.posY += this.velocity;

    //     if (!this.onGround()) {
    //         this.velocity += this.weight;
    //     } else {
    //         this.velocity = 0;
    //     }
    // }

    public update(keys: Keys) {
        this.move(keys);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }

    private onGround() {
        return this.posY >= this.game.height - this.height;
    }

    private canMoveY() {
        return true;
    }

    private canMoveX() {
        return true;
    }
}
