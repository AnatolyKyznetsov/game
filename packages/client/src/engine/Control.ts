import { Game } from './Game';

export class Control {
    private game: Game;

    constructor(game: Game) {
        this.game = game;

        this.addEvents();
    }

    private moveEvents(e: KeyboardEvent, isMoving: boolean): void {
        switch(e.key) {
        case 'ArrowRight':
            this.game.eventBus.emit('moveRight', isMoving);
            break;
        case 'ArrowLeft':
            this.game.eventBus.emit('moveLeft', isMoving);
            break;
        case 'ArrowUp':
            this.game.eventBus.emit('moveUp', isMoving);
            break;
        case 'ArrowDown':
            this.game.eventBus.emit('moveDown', isMoving);
            break;
        }
    }

    private changePlayerEvents(e: KeyboardEvent): void {
        switch(e.code) {
        case 'KeyQ':
            this.game.eventBus.emit('prevPlayer');
            break;
        case 'KeyW':
            this.game.eventBus.emit('nextPlayer');
            break;
        }
    }

    private abilitiesEvents(e: KeyboardEvent): void {
        switch(e.code) {
        case 'KeyA':
        case 'Space':
            this.game.eventBus.emit('firstAbility');
            break;
        case 'KeyS':
            this.game.eventBus.emit('secondAbility');
            break;
        }
    }

    private addEvents(): void {
        window.addEventListener('keydown', e => {
            this.moveEvents(e, true);
        });

        window.addEventListener('keyup', e => {
            this.moveEvents(e, false);
            this.changePlayerEvents(e);
            this.abilitiesEvents(e);
        });
    }
}
