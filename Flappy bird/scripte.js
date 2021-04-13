class Renderer {
    render(a, b, c) {
        document.getElementById("box").style.bottom = String(a) + "px";
        
        b.forEach((o, i) => {
            document.getElementsByClassName("object")[i].setAttribute("style", "right: " + o.right+ "px");
        })

        document.getElementById("score").innerHTML = c;
    }
    reset() {
        //for(let i = 0; i < document.getElementsByClassName("object").length; i++){
            $(".object").remove();/*[i]*/
        //}
    }
}

class Game {
    constructor() {
        this.Render = new Renderer();
        this.Player = new Box();
        this.Obsticals = [];
        this.isnewObjectvar = 0;
        this.highscore = 0;
        this.score = 0;
        this.Gameloop();
    }

    restart() {
        clearInterval(this.loopofGame);
        if(this.score > this.highscore) {
            this.highscore = this.score;
            document.getElementById("highscore").innerHTML = "High Score: " + this.highscore
        }
        this.Player.reset();
        this.Render.reset();
        this.Obsticals = [];
        this.isnewObjectvar = 0;
        this.score = 0;
        this.Gameloop();
        
    }

    start() {
        document.body.onkeyup = (e) => {
            if(e.keyCode == 32){
                this.Player.jump();
            }
        }   
        document.body.addEventListener("click", () => {
            this.Player.jump();
        });
    }

    update() {
        this.Render.render(this.Player.height, this.Obsticals, this.score);
        this.Player.Fall();
        this.Obsticals.forEach((o) => {
            o.move();
        });
        if(this.isnewObject()){
            this.Obsticals.push(new Obsical(1));
            this.Obsticals.forEach((o, i) => {
                if(o.right > 2000){
                    this.Obsticals.shift();
                    document.getElementsByClassName("object")[0].remove();
                }
            });
        }
        if(this.IsGameOver()){
            this.restart();
        }
    }

    Gameloop() {
        this.start();
        this.loopofGame = setInterval(() => {
            this.update();
        }, 10);
    }
    isnewObject() {
        this.isnewObjectvar += 1;
        if(this.isnewObjectvar == 200){
            this.isnewObjectvar = 0;
            this.score += 1;
            return true;
            
        } else {
            return false;
        }
    }

    IsGameOver() {
        let Temp = false;
        let Box = document.getElementById('box');
        let style = window.getComputedStyle(Box).right;
        style = parseInt(style);
        this.Obsticals.forEach((o) => {
            if((o.right - 40 < style && o.right > style) || (o.right - 40 < style + 20 && o.right > style + 20)){
                if(this.Player.height > o.bottom && this.Player.height + 20 < o.top){
                    Temp = false;
                }else{
                    Temp = true;
                }
            }
        });
        if(this.Player.height < 0){
            this.Player.height = 200;
            this.Player.speed = 0;
            Temp = true;
        }
        if(this.Player.height > 500){
            this.Player.height = 200;
            this.Player.speed = 0;
            Temp = true;
        }
        return Temp;
    }
}

class Box {
    constructor() {
        this.height = 200;
        this.speed = 0;
    }

    reset() {
        this.height = 200;
        this.speed = 0;
    }

    Fall() {
        this.height -= this.speed;
        this.getFaster();
    }

    getFaster() {
        this.speed += .05;
    }

    jump() {
        this.speed = -3;
    }   
}

class Obsical {
    constructor(a) {
        let Temp = Math.floor((Math.random() * 350) + 1);;
        let object = document.createElement('div');
        object.setAttribute("class", "object");
        let top = document.createElement('div');
        top.setAttribute("class", "top");
        top.setAttribute("style", "height: " + String(Temp) + "px");
        let bottom = document.createElement('div');
        bottom.setAttribute("class", "bottom");
        bottom.setAttribute("style", "height: " + String(500 - Temp - 150) + "px");
        object.appendChild(top);
        object.appendChild(bottom);
        document.getElementById("container").appendChild(object);
        this.top = 500 - Temp;
        this.bottom = 500 - Temp - 150;
        this.right = 0;
        this.speed = a;
    }

    move() {
        this.right = this.right + this.speed;
    }

    
}

let Game1 = new Game();