export class Control {
    public keys: string[];
    private usedKeys: string[];

    constructor() {
        this.keys = [];
        this.usedKeys = [ 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight' ];

        this.addEvents();
    }

    isUsedKey(e: KeyboardEvent) {
        return this.usedKeys.find(item => item === e.key);
    }

    addEvents() {
        window.addEventListener('keydown', e => {
            if (this.isUsedKey(e) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', e => {
            this.keys.splice(this.keys.indexOf(e.key), 1);
        });
    }
}
