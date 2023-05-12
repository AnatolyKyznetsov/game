import { Game } from './Game';
import { LvlData, PosAndSize } from './interfaces';

export class Map {
    private game: Game;
    public data: LvlData;

    constructor(game: Game, data: LvlData) {
        this.game = game;
        this.data = data;
    }

    drawItem(item: PosAndSize, color: string): void {
        this.game.ctx.fillStyle = color;
        this.game.ctx.fillRect(item.x, item.y, item.width, item.height);
    }

    draw(): void {
        this.data.stairs.forEach(item => {
            this.drawItem(item, 'blue');
        });

        this.data.platforms.forEach(item => {
            this.drawItem(item, 'red');
        });
    }
}
