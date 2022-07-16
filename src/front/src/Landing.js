class Landing extends Phaser.Scene {
    constructor() {
        super({ key: "Landing" });
        this.speed = 500
    }
    preload() {
        this.load.image('environment', 'assets/img/background.png');
    }
    startBtn = () => {
        this.button.removeEventListener('click', this.startBtn )
        this.button.style.display = 'none'
        this.title.style.display = 'none'
        this.scene.start('Game')
        console.log('start');
    }
    create() {
        this.environment = this.add.image(0, 0, 'environment');
        this.environment.setOrigin(0, 0);

        this.title = document.createElement('h1')
        this.title.innerHTML = 'Arkanoid'
        document.body.appendChild(this.title)
        this.button = document.createElement('button')
        this.button.innerHTML = 'Start'
        document.body.appendChild(this.button)
        this.button.addEventListener('click', this.startBtn )
    }
    update(time, delta) {
    }
}

const landing = new Landing()
export default landing
export { Landing }