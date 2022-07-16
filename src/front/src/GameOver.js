class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
        this.speed = 500
    }
    preload() {
        this.load.image('environment', 'assets/img/background.png');
    }
    create() {
        this.environment = this.add.image(0, 0, 'environment');
        this.environment.setOrigin(0, 0);

        this.title = document.querySelector('h1')
        this.title.innerHTML = 'Game Over'
        document.body.appendChild(this.title)
        this.button = document.querySelector('button')
        this.button.innerHTML = 'Restart'
        document.body.appendChild(this.button)
        this.button.style.display = 'block'
        this.title.style.display = 'block'
        this.button.addEventListener('click', () => {
            this.button.style.display = 'none'
            this.title.style.display = 'none'
            this.scene.start('Game')
        })
    }
    update(time, delta) {
    }
}

const gameOver = new GameOver()
export default gameOver
export { GameOver }