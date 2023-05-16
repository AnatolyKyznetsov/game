import { EventBus } from '../utils/EventBus';
import { Player } from './Player';
import { Control } from './Control';
import { Map } from './Map';
import { Eric } from './players/Eric';
import { Baelog } from './players/Baelog';
import { Olaf } from './players/Olaf';
import { LvlData, Size } from './interfaces';

import lvl_1 from '../lvlMaps/lvl_1.json';

const lvls = [
    lvl_1,
]

export class Game {
    public size: Size;
    public screen: Size;
    public ctx: CanvasRenderingContext2D;
    public map: Map;
    public eventBus: EventBus;
    public activePlayer: Player;
    public currentLvl: LvlData;
    public players: Player[];
    private control: Control;
    private currentLvlIndex: number;
    private activePlayerIndex: number;
    private drawnOnce: boolean;
    private lvlBackground?: CanvasImageSource;
    private prevPlayer?: Player;
    private needChangePlayer: boolean;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.currentLvlIndex = 0;
        this.currentLvl = lvls[this.currentLvlIndex];

        this.size = {
            width: this.currentLvl.size.width,
            height: this.currentLvl.size.height,
        }

        this.screen = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.eventBus = new EventBus();
        this.control = new Control(this);
        this.map = new Map(this, this.currentLvl);

        this.players = [
            new Eric(this, {
                x: this.currentLvl.playersPosition.eric.x,
                y: this.currentLvl.playersPosition.eric.y
            }),
            new Baelog(this, {
                x: this.currentLvl.playersPosition.baelog.x,
                y: this.currentLvl.playersPosition.baelog.y
            }),
            new Olaf(this, {
                x: this.currentLvl.playersPosition.olaf.x,
                y: this.currentLvl.playersPosition.olaf.y
            })
        ];

        this.activePlayerIndex = 0;
        this.activePlayer = this.players[this.activePlayerIndex];

        this.drawnOnce = false;

        this.needChangePlayer = false;

        this.addEvents();
    }

    public getStartPointX(): number {
        return this.currentLvl.startPoint.x - window.innerWidth > 0 ? this.currentLvl.startPoint.x - window.innerWidth : 0;
    }

    public getStartPointY(): number {
        return this.currentLvl.startPoint.y - window.innerHeight > 0 ? this.currentLvl.startPoint.y - window.innerHeight : 0;
    }

    private addEvents(): void {
        this.eventBus.on('moveCameraX', (speed: number) => {
            this.moveCamera(speed, 'x');
        });

        this.eventBus.on('moveCameraY', (speed: number) => {
            this.moveCamera(speed, 'y');
        });

        this.eventBus.on('prevPlayer', () => {
            this.needChangePlayer = true;
            this.activePlayerIndex = this.activePlayerIndex - 1 < 0 ? this.players.length - 1 : this.activePlayerIndex - 1;
        });

        this.eventBus.on('nextPlayer', () => {
            this.needChangePlayer = true;
            this.activePlayerIndex = this.activePlayerIndex + 1 > this.players.length - 1 ? 0 : this.activePlayerIndex + 1;
        });
    }

    private moveCamera(speed: number, axis: 'x' | 'y') {
        speed = -speed;
        this.activePlayer.screen[axis] -= speed;
        this.ctx.translate(axis === 'x' ? speed : 0, axis === 'y' ? speed : 0);
    }

    private changePlayer(): void {
        this.prevPlayer = this.activePlayer;
        this.activePlayer = this.players[this.activePlayerIndex];
        this.ctx.translate(this.prevPlayer.screen.x - this.activePlayer.screen.x, this.prevPlayer.screen.y - this.activePlayer.screen.y);
        this.needChangePlayer = false;
        this.eventBus.emit('update');
    }

    public update(): void {
        if (this.needChangePlayer) {
            this.changePlayer();
        }

        this.players.forEach(player => {
            player.update();
        });
    }

    public loadImage(path: string): CanvasImageSource | undefined {
        if (!path) {
            return;
        }

        const image = new Image();

        image.src = path;

        return image;
    }

    private firstDraw(): void {
        this.ctx.translate(-this.activePlayer.screen.x, -this.activePlayer.screen.y);
        this.drawnOnce = true;
    }

    public draw(delay: number): void {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);

        if (!this.lvlBackground && this.currentLvl.background) {
            this.lvlBackground = this.loadImage(this.currentLvl.background);

            return;
        }

        if (this.lvlBackground) {
            this.ctx.drawImage(this.lvlBackground, 0, 0, this.size.width, this.size.height, 0, 0, this.size.width, this.size.height);
        }

        if (!this.drawnOnce) {
            this.firstDraw();
        }

        this.map.draw();

        this.players.forEach(player => {
            player.draw();
        });

        this.update();
    }
}
