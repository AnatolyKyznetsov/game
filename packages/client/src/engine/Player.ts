import { Game } from './Game';
import { PosAndSize, Moving, Position, Size, CameraBox } from './interfaces';

export abstract class Player {
    public screen: Position;

    protected game: Game;
    private moving: Moving;

    protected size: Size;
    protected position: Position;

    protected maxSpeed: number;
    protected spritePath: string;

    protected velocity: Position;
    protected gravity: number;
    protected bottomIndent: number;

    protected canMoveY: boolean;
    protected isActivePlayer: boolean;

    protected firstAbilityInProgress: boolean;
    protected secondAbilityInProgress: boolean;
    protected sprite?: CanvasImageSource;

    private cameraBox: CameraBox;

    constructor(game: Game, posAndSize: PosAndSize) {
        this.game = game;

        this.screen = {
            x: this.game.getStartPointX(),
            y: this.game.getStartPointY(),
        }

        this.size = {
            width: posAndSize.width,
            height: posAndSize.height,
        }

        this.firstAbilityInProgress = false;
        this.secondAbilityInProgress = false;

        this.position = { x: posAndSize.x , y: posAndSize.y };

        this.maxSpeed = 4;
        this.velocity = { x: 0, y: 0 }
        this.gravity = .5;

        this.spritePath = '';

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
            bottomIndent: 10
        }

        this.bottomIndent = .01;

        this.isActivePlayer = false;

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
        this.game.eventBus.on('moveRight', (isMoveing: boolean) => {
            if (this.isActivePlayer) {
                this.moving.right = isMoveing;
            }
        });

        this.game.eventBus.on('moveLeft', (isMoveing: boolean) => {
            if (this.isActivePlayer) {
                this.moving.left = isMoveing;
            }
        });

        this.game.eventBus.on('moveUp', (isMoveing: boolean) => {
            if (this.isActivePlayer) {
                this.moving.up = isMoveing;
            }
        });

        this.game.eventBus.on('moveDown', (isMoveing: boolean) => {
            if (this.isActivePlayer) {
                this.moving.down = isMoveing;
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

                    this.position.x -= this.maxSpeed;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;

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
    }

    public draw(): void {
        if (!this.sprite) {
            this.sprite = this.game.loadImage(this.spritePath);

            return;
        }

        this.game.ctx.fillStyle = 'green';
        this.game.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

        // this.game.ctx.drawImage(this.sprite, 0, 0, this.size.width, this.size.height, this.position.x, this.position.y, this.size.width, this.size.height);
    }
}
