import { Game } from './Game';
import { PosAndSize, Moving, Position, Size, CameraBox, Players } from './interfaces';
import { v4 as makeId } from 'uuid'

export abstract class Player {
    public id: string;
    public screen: Position;

    public game: Game;
    private moving: Moving;

    public size: Size;
    public position: Position;
    public spritePath: string;
    public avatarPos: string;
    public deadAvatar: string;

    protected maxSpeed: number;

    protected velocity: Position;
    protected gravity: number;
    protected bottomIndent: number;

    protected canMoveY: boolean;
    public isActivePlayer: boolean;

    protected firstAbilityInProgress: boolean;
    protected secondAbilityInProgress: boolean;
    protected sprite?: CanvasImageSource;

    private cameraBox: CameraBox;

    public healPoints: number;
    public armorPoints: number;

    public isDead: boolean;

    private frameX: number;
    private frameY: number;

    private maxFrameX: number;
    private isDirectionRight: boolean;
    private animInProgress: boolean;

    constructor(game: Game, position: Position, name: keyof Players<unknown>) {
        this.game = game;
        this.id = makeId();

        this.screen = {
            x: this.game.getStartPointX(name),
            y: this.game.getStartPointY(name),
        }

        this.size = {
            width: 64,
            height: 65,
        }

        this.firstAbilityInProgress = false;
        this.secondAbilityInProgress = false;

        this.position = { x: position.x , y: position.y };

        this.maxSpeed = 4;
        this.velocity = { x: 0, y: 0 }
        this.gravity = .5;

        this.spritePath = '';
        this.avatarPos = '';
        this.deadAvatar = '';

        this.moving = {
            left: false,
            right: false,
            up: false,
            down: false,
        }

        this.canMoveY = false;

        this.cameraBox = {
            x: 0,
            y: 0,
            width: this.game.screen.width / 1.2,
            height: 500,
            bottomIndent: 80
        }

        this.bottomIndent = .01;

        this.isActivePlayer = true;

        this.healPoints = 3;
        this.armorPoints = 0;

        this.isDead = false;

        this.frameX = 0;
        this.frameY = 0;

        this.maxFrameX = 0;
        this.isDirectionRight = true;
        this.animInProgress = false;

        this.addEvents();
    }

    protected abstract firstAbility(): void

    protected abstract secondAbility(): void

    private checkActivePlayer(): void {
        if (this.game.activePlayer === this) {
            this.isActivePlayer = true;
        } else {
            this.isActivePlayer = false;

            this.moving = {
                left: false,
                right: false,
                up: false,
                down: false,
            }

            this.velocity.x = 0
            this.firstAbilityInProgress = false;
            this.secondAbilityInProgress = false;
        }
    }

    private addEvents(): void {
        this.game.eventBus.on('moveRight', (isMoving: boolean) => {
            if (this.isActivePlayer) {
                this.isDirectionRight = true;

                if (isMoving) {
                    this.movingAnim();
                } else {
                    this.frameReset();
                }

                this.moving.right = isMoving;
            }
        });

        this.game.eventBus.on('moveLeft', (isMoving: boolean) => {
            if (this.isActivePlayer) {
                this.isDirectionRight = false;

                if (isMoving) {
                    this.movingAnim();
                } else {
                    this.frameReset();
                }

                this.moving.left = isMoving;
            }
        });

        this.game.eventBus.on('moveUp', (isMoving: boolean) => {
            if (this.isActivePlayer) {
                if (isMoving && this.canMoveY) {
                    this.climbAnim();
                } else {
                    this.climbAnimReset();
                }

                this.moving.up = isMoving;
            }
        });

        this.game.eventBus.on('moveDown', (isMoving: boolean) => {
            if (this.isActivePlayer) {
                if (isMoving && this.canMoveY) {
                    this.climbAnim();
                } else {
                    this.climbAnimReset();
                }

                this.moving.down = isMoving;
            }
        });

        this.game.eventBus.on('firstAbility', () => {
            if (this.isActivePlayer) {
                this.firstAbilityInProgress = true;
            }
        });

        this.game.eventBus.on('secondAbility', () => {
            if (this.isActivePlayer) {
                this.secondAbilityInProgress = true;
            }
        });
    }

    private move(): void {
        if (this.moving.right) {
            this.velocity.x = this.maxSpeed;
            this.position.x += this.velocity.x;
        } else if (this.moving.up && this.canMoveY) {
            this.velocity.y = -this.maxSpeed;
            this.position.y += this.velocity.y;
        } else if (this.moving.down && this.canMoveY) {
            this.velocity.y = this.maxSpeed;
            this.position.y += this.velocity.y;
        } else if (this.moving.left) {
            this.velocity.x = -this.maxSpeed;
            this.position.x += this.velocity.x;
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

    private collisionStairs(): void {
        for (let i = 0; i < this.game.map.data.stairs.length; i++) {
            const block = this.game.map.data.stairs[i];

            this.canMoveY = this.collision(block);

            if (this.canMoveY) {
                break;
            }
        }
    }

    private сollisionDetectionVertical() {
        for (let i = 0; i < this.game.map.data.platforms.length; i++) {
            const block = this.game.map.data.platforms[i];

            if (this.collision(block)) {

                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    this.position.y = block.y - this.size.height - this.bottomIndent;
                    break;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;

                    this.position.y = block.y + block.height + this.bottomIndent;
                    break;
                }
            }
        }
    }

    private сollisionDetectionHorizontal() {
        for (let i = 0; i < this.game.map.data.platforms.length; i++) {
            const block = this.game.map.data.platforms[i];

            if (this.collision(block)) {

                if (this.velocity.x > 0) {
                    this.velocity.x = 0;

                    this.bumpAnim();
                    this.position.x -= this.maxSpeed;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;

                    this.bumpAnim();
                    this.position.x += this.maxSpeed;
                    break;
                }
            }

        }
    }

    private applyGraivty(): void {
        if (this.canMoveY) {
            return;
        }

        this.velocity.y += this.gravity;
        this.velocity.y = this.velocity.y > 18 ? 18 : this.velocity.y;
        this.position.y += this.velocity.y;
    }

    private moveCameraBox(): void {
        this.cameraBox.x = this.position.x - this.cameraBox.width / 2 + this.size.width / 2;
        this.cameraBox.y = this.position.y - this.cameraBox.height + this.size.height + this.cameraBox.bottomIndent;

        if (this.isActivePlayer) {
            this.game.ctx.fillStyle = 'rgba(0,0,0,0)';
            this.game.ctx.fillRect(this.cameraBox.x, this.cameraBox.y, this.cameraBox.width, this.cameraBox.height);
        }

        this.shouldMoveCamera();
    }

    private shouldMoveCamera(): void {
        if ((this.cameraBox.x + this.cameraBox.width < this.game.size.width &&
            this.cameraBox.x + this.cameraBox.width > this.screen.x + this.game.screen.width) ||
            (this.cameraBox.x > 0 && this.cameraBox.x < this.screen.x)) {
            this.game.eventBus.emit('moveCameraX', this.velocity.x);
        }

        if ((this.cameraBox.y + this.cameraBox.height < this.game.size.height &&
            this.cameraBox.y + this.cameraBox.height > this.screen.y + this.game.screen.height) ||
            (this.cameraBox.y > 0 && this.cameraBox.y < this.screen.y)) {
            this.game.eventBus.emit('moveCameraY', this.velocity.y);
        }

        if (this.isActivePlayer) {
            if (this.cameraBox.y + this.cameraBox.height - this.cameraBox.bottomIndent + this.bottomIndent === this.game.currentLvl.size.height &&
                this.screen.y + this.game.screen.height < this.game.currentLvl.size.height + this.cameraBox.bottomIndent) {
                this.game.eventBus.emit('moveCameraY', 2);
            }
        }
    }

    public getDamage(dmg: number): void {
        if (this.armorPoints) {
            dmg--;
            this.armorPoints = 0;
        }

        this.healPoints = this.healPoints - dmg < 0 ? 0 : this.healPoints - dmg;

        if (this.healPoints === 0) {
            this.isDead = true;
            this.avatarPos = this.deadAvatar;
            this.deathAnim();
            this.game.eventBus.emit('nextPlayer');
        }

        this.game.eventBus.emit('update');
    }

    private frameReset(): void {
        this.animInProgress = false;
        this.frameX = 0;
        this.frameY = this.isDirectionRight ? 0 : 2;
        this.maxFrameX = 0;
    }

    private frameChange(): void {
        if (this.game.frameSettings.timer > this.game.frameSettings.interval) {
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

    private movingAnim(): void {
        if (this.animInProgress) {
            return;
        }

        this.frameY = this.isDirectionRight ? 4 : 6;
        this.maxFrameX = 7;
    }

    private deathAnim(): void {
        this.frameY = this.isDirectionRight ? 14 : 16;
        this.maxFrameX = 7;
    }

    private bumpAnim(): void {
        this.animInProgress = true;
        this.frameY = this.isDirectionRight ? 8 : 10;
        this.maxFrameX = 3;
    }

    private climbAnim(): void {
        this.animInProgress = true;
        this.frameY = 12;
        this.maxFrameX = 3;
    }

    private climbAnimReset(): void {
        this.maxFrameX = 0;
    }

    public update(): void {
        this.checkActivePlayer();
        this.moveCameraBox();
        this.move();

        this.firstAbility();
        this.secondAbility();

        this.сollisionDetectionHorizontal();
        this.applyGraivty();
        this.сollisionDetectionVertical();
        this.collisionStairs();
        this.frameChange();
    }

    public draw(): void {
        if (!this.sprite) {
            this.sprite = this.game.loadImage(this.spritePath);

            return;
        }

        this.game.ctx.drawImage(
            this.sprite,
            this.size.width * this.frameX,
            this.size.height * this.frameY,
            this.size.width,
            this.size.height,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }
}
