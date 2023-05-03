import { Player } from './Player';
import { Control } from './Control';

export class Game {
    public width: number;
    public height: number;
    public image: HTMLImageElement;
    private player: Player;
    private control: Control;

    constructor(width: number, height: number, image: HTMLImageElement) {
        this.width = width;
        this.height = height;
        this.image = image;
        this.player = new Player(this);
        this.control = new Control();
    }

    public update() {
        this.player.update(this.control.keys);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.player.draw(ctx);
    }
}
