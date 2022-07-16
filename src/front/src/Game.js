class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
        this.speed = 500
        this.initialBallPosition = { x: 144, y: 256 }
        this.nBricks = 6
        this.hp = 3
        this.health = this.hp
        this.environmentSound = false
    }
    preload() {
        this.load.image('environment', 'assets/img/background.png');
        this.load.image('player', 'assets/img/player.png');
        this.load.image('ball', 'assets/img/ball.png');
        this.load.image('brick', 'assets/img/brick.png');
        this.load.audio('hit', 'assets/audio/hit.wav');
        this.load.audio('background', 'assets/audio/background.ogg');
        this.load.audio('lose', 'assets/audio/lose.ogg');
        this.load.audio('win', 'assets/audio/win.ogg');
    }
    create() {
        console.log('create scene game');
        this.soundHit = this.sound.add('hit', { loop: false })
        this.soundLose = this.sound.add('lose', { loop: false })
        this.soundWin = this.sound.add('win', { loop: false })
        this.soundEnvironment = this.sound.add('background', { loop: true })
        if(!this.environmentSound){
            this.soundEnvironment.play()
            this.environmentSound = true
        }
        this.physics.world.setBoundsCollision(true, true, true, false)
        this.environment = this.add.image(0, 0, 'environment');
        this.environment.setOrigin(0, 0);
        this.player = this.physics.add.image(144, 492, 'player');
        this.player.setImmovable()
        this.player.setCollideWorldBounds(true)

        this.ball = this.physics.add.image(
            this.initialBallPosition.x,
            this.initialBallPosition.y,
            'ball'
        );
        this.ball.body.onWorldBounds = true;
        this.physics.add.collider(this.ball, this.player, this.soundHitEvent, null, this)
        this.ball.setCollideWorldBounds(true)
         this.ball.setBounce(1)
        this.restartBall()


        this.cursors = this.input.keyboard.createCursorKeys()
        this.myGroup = this.physics.add.staticGroup()

        for (let index = 0; index < this.nBricks; index++) {
            let gap = 288 / (this.nBricks + 1)
            let tmp = this.myGroup.create(gap * (index + 1), 56, 'brick')
            tmp.setOrigin(0.5, 0.5)
        }
        this.physics.add.collider(this.ball, this.myGroup, this.collision, null, this)
        this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => { 
            this.soundHitEvent()
        });

    }
    start() {
        this.scene.resume()
    }
    soundHitEvent() {
        this.soundHit.play()
    }
    collision = (ball, brick) => {
        brick.disableBody(true, true)
        this.soundHitEvent()
        if (this.myGroup.countActive() === 0) {
            this.scene.pause()
            this.win()
            this.soundWin.play()
        }
    }
    restartBall() {
        this.ball.x = this.initialBallPosition.x
        this.ball.y = this.initialBallPosition.y
        let x = (Math.random() > 0.5) ? 1 : -1
        x = x * (Math.random()*40+30)
        this.ball.setVelocity(x, -300)
    }
    update(time, delta) {
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.speed)
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.speed)
        } else {
            this.player.setVelocityX(0)
        }
        this.fallDown()
        if (this.ball.body.collideWorldBounds && this.ball.body.checkWorldBounds()){
            this.soundHitEvent()
        }
    }
    fallDown() {
        if (this.ball.y > this.player.y) {
            this.health--
            this.gameOver()
            this.soundLose.play()
        }
        
    }
    restart = () => {
        this.button.style.display = 'none'
        this.title.style.display = 'none'
        this.scene.start('Game')
        this.button.removeEventListener('click', this.restart)
    }
    gameOver() {
        if (this.health === 0) {
            this.scene.pause()
            this.health = this.hp
            this.title = document.querySelector('h1')
            this.title.innerHTML = 'Game Over'
            this.button = document.querySelector('button')
            this.button.innerHTML = 'Restart'
            this.button.style.display = 'block'
            this.title.style.display = 'block'
            this.button.addEventListener('click', this.restart)
        } else {
            this.restartBall()
        }
    }
    win() {
        this.scene.pause()
        this.health = this.hp
        this.title = document.querySelector('h1')
        this.title.innerHTML = 'You win'
        this.button = document.querySelector('button')
        this.button.innerHTML = 'Restart'
        this.button.style.display = 'block'
        this.title.style.display = 'block'
        this.button.addEventListener('click', this.restart)
    }
}

const game = new Game()
export default game
export { Game }

