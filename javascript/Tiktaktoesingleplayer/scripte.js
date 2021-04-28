let Feld = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];


for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        document.getElementById(String(i) + String(j)).addEventListener("click", () => {
            click(i, j, Feld);
        });
    }
}

function restart() {
    Feld = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    printfeld(Feld);
}

function printfeld(Feld) {
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            document.getElementById(String(i) + String(j)).innerHTML = "<div>" + Feld[i][j] + "</div>";
        }
    }
}

function iswon(Feld) {
    if (Feld[0][0] == "X" && Feld[0][1] == "X" && Feld[0][2] == "X") {
        return "X";
    }
    if (Feld[1][0] == "X" && Feld[1][1] == "X" && Feld[1][2] == "X") {
        return "X";
    }
    if (Feld[2][0] == "X" && Feld[2][1] == "X" && Feld[2][2] == "X") {
        return "X";
    }
    if (Feld[0][0] == "X" && Feld[1][0] == "X" && Feld[2][0] == "X") {
        return "X";
    }
    if (Feld[0][1] == "X" && Feld[1][1] == "X" && Feld[2][1] == "X") {
        return "X";
    }
    if (Feld[0][2] == "X" && Feld[1][2] == "X" && Feld[2][2] == "X") {
        return "X";
    }
    if (Feld[0][0] == "X" && Feld[1][1] == "X" && Feld[2][2] == "X") {
        return "X";
    }
    if (Feld[0][2] == "X" && Feld[1][1] == "X" && Feld[2][0] == "X") {
        return "X";
    }


    if (Feld[0][0] == "O" && Feld[0][1] == "O" && Feld[0][2] == "O") {
        return "O";
    }
    if (Feld[1][0] == "O" && Feld[1][1] == "O" && Feld[1][2] == "O") {
        return "O";
    }
    if (Feld[2][0] == "O" && Feld[2][1] == "O" && Feld[2][2] == "O") {
        return "O";
    }
    if (Feld[0][0] == "O" && Feld[1][0] == "O" && Feld[2][0] == "O") {
        return "O";
    }
    if (Feld[0][1] == "O" && Feld[1][1] == "O" && Feld[2][1] == "O") {
        return "O";
    }
    if (Feld[0][2] == "O" && Feld[1][2] == "O" && Feld[2][2] == "O") {
        return "O";
    }
    if (Feld[0][0] == "O" && Feld[1][1] == "O" && Feld[2][2] == "O") {
        return "O";
    }
    if (Feld[0][2] == "O" && Feld[1][1] == "O" && Feld[2][0] == "O") {
        return "O";
    }
}

function click(a, b, Feld) {
    if(Feld[a][b] == ""){
        Feld[a][b] = "X";
    }

    won = iswon(Feld);

    if(won == "X"){
        console.log("X won");
        printfeld(Feld);
        setTimeout(() => {restart();printfeld(Feld);}, 2000);
    }

    if(won == "O"){
        console.log("O won");
        printfeld(Feld);
        setTimeout(() => {restart();printfeld(Feld);}, 2000);
    }
    
    if(won == undefined){
        do {
            let random0 = Math.round(Math.random() * 2);
            let random1 = Math.round(Math.random() * 2);
            Temp = true;
            Temp2 = false;
            if(Feld[random0][random1] == ""){
                Feld[random0][random1] = "O";
                Temp = false;
            }
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(Feld[i][j] == ""){
                        Temp2 = true;
                    }
                }
            }
        } while (Temp && Temp2);
    }

    won = iswon(Feld);

    if(won == "X"){
        console.log("X won");
        printfeld(Feld);
        setTimeout(() => {restart();}, 2000);
    }

    if(won == "O"){
        console.log("O won");
        printfeld(Feld);
        setTimeout(() => {restart();}, 2000);
    }

    printfeld(Feld);
}

