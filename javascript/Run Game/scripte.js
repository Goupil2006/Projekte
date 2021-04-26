class Rendererer {
    render(Playerheight) {
        document.getElementById("Player").style.Bottom = Playerheight + "px";
    }
}

class Game {
    constructor() {
        this.Player = new Box();
        this.renderer = new Rendererer();
        this.Gameloop();
    }

    update() {
        this.Player.tick();
        this.renderer.render(this.Player.height);
    }

    start() {
        document.body.onkeyup = (e) => {
            if(e.keyCode == 32){
                this.Player.jump();
            }
        } 
    }

    Gameloop() {
        this.start();
        setInterval(() => {
            this.update();
        }, 10);
    }
}

class Box {
    constructor() {
        this.height = 0;
        this.speed = 0;
    }

    tick() {
        this.speed += .05;
        this.height -= this.speed;
    }

    jump() {
        this.speed += 3;
    }
}

let lol = new Game();