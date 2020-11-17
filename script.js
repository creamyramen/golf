let course = document.querySelectorAll(".course"),
    info;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector("body").classList.remove("light");
    document.querySelector("body").classList.add("dark");

}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.querySelector("body").classList.remove("light");
        document.querySelector("body").classList.add("dark");
    } else {
        document.querySelector("body").classList.remove("dark");
        document.querySelector("body").classList.add("light");
    }
});

let http = new XMLHttpRequest();
http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        info = JSON.parse(this.responseText);
        for (let i = 0; i <= 2; i++) {
            let target = document.querySelector(`.c${i}`);
            target.querySelector("img").src = info.courses[i].image;
            target.querySelector("p").innerHTML = info.courses[i].name;
        }
    }
};
http.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
http.send();

for (let i = 0; i < document.querySelector(".wrap").childElementCount; i++) {
    course[i].addEventListener("click", function() {
        let https = new XMLHttpRequest();
        https.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let inf = JSON.parse(this.responseText);
                console.log(inf);
                document.querySelector("body").classList.add("activeSelect");
                document.querySelector(".submit").addEventListener("click", function() {
                    let playerCount = document.querySelector("input").value;
                    if (playerCount < 5 && playerCount > 0) {
                        for (let a = 1; a <= playerCount; a++) {
                            document.querySelector(".player").style.display = "none";
                            let player = document.createElement("div");
                            player.classList.add("player");
                            player.innerHTML = `<p>What's your first name?</p><input type="text" class="name"><p class="error"></p><p>Select your tee</p><select name="tee" class="tee"></select>`;
                            document.querySelector(".select").appendChild(player);
                            for (let b = 0; b < inf.data.holes[0].teeBoxes.length; b++) {
                                if (inf.data.holes[0].teeBoxes[b].teeType != "auto change location") {
                                    let option = document.createElement("option");
                                    option.innerHTML = inf.data.holes[0].teeBoxes[b].teeType;
                                    option.value = b;
                                    document.querySelectorAll(".tee")[a - 1].appendChild(option);
                                }
                            }

                        }
                        let submit = document.createElement("button");
                        submit.innerHTML = "Submit";
                        submit.classList.add("submit");
                        document.querySelector(".select").appendChild(submit);
                        submit.addEventListener("click", function() {
                            let bad = [0, 0, 0, 0],
                                players = [{}, {}, {}, {}];
                            for (let c = 0; c < playerCount; c++) {
                                let name = document.querySelectorAll(".name")[c],
                                    tee = document.querySelectorAll(".tee")[c].value;
                                if (name.value == "") {
                                    document.querySelectorAll(".error")[c + 1].innerHTML = "Please enter a name";
                                    bad[c] = 1;
                                } else {
                                    name = document.querySelectorAll(".name")[c].value;
                                    document.querySelectorAll(".error")[c + 1].innerHTML = "";
                                    bad[c] = 0;
                                    players[c].name = name;
                                    players[c].tee = tee;
                                    players[c].score = [];
                                    for (let d = 0; d < inf.data.holeCount; d++) {
                                        players[c].score.push("");
                                    }
                                }
                            }
                            if (JSON.stringify(bad) === JSON.stringify([0, 0, 0, 0])) {
                                let activePlayer = 0;
                                document.querySelector("body").classList.remove("activeSelect");
                                document.querySelector("body").classList.add("cardActive");
                                if (playerCount != 1) {
                                    let playerSelect = document.createElement("select");
                                    playerSelect.classList.add("playerSelect");
                                    document.querySelector(".card").appendChild(playerSelect);
                                    for (let d = 0; d < playerCount; d++) {
                                        let player = document.createElement("option");
                                        player.value = d;
                                        player.innerHTML = players[d].name;
                                        playerSelect.appendChild(player);
                                    }
                                }
                                let table = document.createElement("div");
                                table.classList.add("table");
                                document.querySelector(".card").appendChild(table);
                                for (let h = 0; h < 5; h++) {
                                    let column = document.createElement('div');
                                    column.classList.add("column");
                                    table.appendChild(column);
                                    for (let f = 0; f < inf.data.holeCount + 3; f++) {
                                        let cell = document.createElement('div');
                                        cell.classList.add('cell');
                                        column.appendChild(cell);
                                    }
                                }
                                let finished = document.createElement("button");
                                finished.classList.add("finished");
                                finished.innerHTML = "Submit";
                                document.querySelector(".card").appendChild(finished);
                                finished.addEventListener("click", function() {
                                    document.querySelector("body").classList.add("activeSelect");
                                    let select = document.querySelector(".select");
                                    select.innerHTML = "<p>Are you sure you want to end the game?</p><div class='buttonWrap'><button class='yes'>Yes</button><button class='no'>No</button></div>";
                                    document.querySelector(".no").addEventListener("click", function() {
                                        document.querySelector("body").classList.remove("activeSelect");
                                    });
                                    document.querySelector(".yes").addEventListener("click", function() {
                                        document.querySelector("body").classList.remove("activeSelect");
                                        document.querySelector("body").style.overflow = "hidden";
                                        let wrapper = document.createElement("div");
                                        wrapper.classList.add("wrapper");
                                        document.querySelector("body").appendChild(wrapper);
                                        for (let z = 0; z < 150; z++) {
                                            let confet = document.createElement("div");
                                            confet.classList.add("confetti-" + z);
                                            wrapper.appendChild(confet);
                                            document.querySelector(".gameOver").classList.add("gamesOver");
                                            document.querySelector(".modalbg").classList.add("gamesDone");

                                        }
                                        for (let j = 0; j < playerCount; j++) {
                                            let score = 0,
                                                hcp = 0,
                                                par = 0;
                                            for (let k = 0; k < 18; k++) {
                                                score += players[j].score[k];
                                                hcp += inf.data.holes[k].teeBoxes[players[j].tee].hcp;
                                                yards += inf.data.holes[k].teeBoxes[players[j].tee].yards;
                                            }
                                            if (parseInt(score) > (parseInt(par) + parseInt(hcp))) {
                                                document.querySelector(".finalScores").innerHTML += `<p>${players[j].name}, you were ${parseInt(score) - (parseInt(par) + parseInt(hcp))} over par</p>`;
                                            } else if (parseInt(score) == (parseInt(par) + parseInt(hcp))) {
                                                document.querySelector(".finalScores").innerHTML += `<p>${players[j].name}, you were right on par</p>`;
                                            } else {
                                                document.querySelector(".finalScores").innerHTML += `<p>${players[j].name}, you were ${(parseInt(par) + parseInt(hcp) - parseInt(score))} under par</p>`;
                                            }
                                        }
                                        document.querySelector(".gameOver").querySelector("button").addEventListener("click", function() {
                                            console.log('refrsed')
                                            window.parent.location = window.parent.location.href;
                                        })
                                    });
                                })
                                let hole = document.querySelectorAll('.column')[0],
                                    yards = document.querySelectorAll('.column')[1],
                                    score = document.querySelectorAll('.column')[2],
                                    par = document.querySelectorAll('.column')[3],
                                    hcp = document.querySelectorAll('.column')[4];
                                hole.classList.add("hole");
                                hole.prepend("Hole");
                                yards.classList.add("yards");
                                yards.prepend("Yards");
                                yards.style.background = inf.data.holes[0].teeBoxes[players[0].tee].teeHexColor;
                                if (inf.data.holes[0].teeBoxes[players[0].tee].teeHexColor == "#ffffff") {
                                    yards.style.color = "black";
                                } else if (inf.data.holes[0].teeBoxes[players[0].tee].teeHexColor == "#fffc00") {
                                    yards.style.color = "black";
                                } else {
                                    yards.style.color = "white";
                                }
                                score.classList.add("score");
                                score.prepend("Score");
                                par.classList.add("par");
                                par.prepend("Par");
                                hcp.classList.add("hcp");
                                hcp.prepend("HCP");
                                for (let g = 0; g < inf.data.holeCount; g++) {
                                    hole.querySelectorAll(".cell")[g].innerHTML = (g + 1);
                                    yards.querySelectorAll('.cell')[g].innerHTML = inf.data.holes[g].teeBoxes[players[0].tee].yards;
                                    par.querySelectorAll(".cell")[g].innerHTML = inf.data.holes[g].teeBoxes[0].par;
                                    hcp.querySelectorAll(".cell")[g].innerHTML = inf.data.holes[g].teeBoxes[players[0].tee].hcp;
                                }
                                hole.querySelectorAll(".cell")[18].innerHTML = "Out";
                                hole.querySelectorAll(".cell")[19].innerHTML = "In";
                                hole.querySelectorAll(".cell")[20].innerHTML = "Total";
                                yards.querySelectorAll(".cell")[18].innerHTML = findIn('.yards');
                                yards.querySelectorAll(".cell")[19].innerHTML = findOut('.yards');
                                yards.querySelectorAll(".cell")[20].innerHTML = findTotal('.yards');
                                score.querySelectorAll(".cell")[18].innerHTML = findIn('.score');
                                score.querySelectorAll(".cell")[19].innerHTML = findOut('.score');
                                score.querySelectorAll(".cell")[20].innerHTML = findTotal('.score');
                                par.querySelectorAll(".cell")[18].innerHTML = findIn('.par');
                                par.querySelectorAll(".cell")[19].innerHTML = findOut('.par');
                                par.querySelectorAll(".cell")[20].innerHTML = findTotal('.par');
                                hcp.querySelectorAll(".cell")[18].innerHTML = findIn('.hcp');
                                hcp.querySelectorAll(".cell")[19].innerHTML = findOut('.hcp');
                                hcp.querySelectorAll(".cell")[20].innerHTML = findTotal('.hcp');
                                if (playerCount != 1) {
                                    document.querySelector(".playerSelect").addEventListener('change', (e) => {
                                        let num = e.target.value,
                                            color = inf.data.holes[0].teeBoxes[players[num].tee].teeHexColor;
                                        console.log(num);
                                        activePlayer = num;
                                        yards.style.background = color;
                                        if (color == "#ffffff") {
                                            yards.style.color = "black";
                                        } else if (color == "#fffc00") {
                                            yards.style.color = "black";
                                        } else {
                                            yards.style.color = "white";
                                        }
                                        for (let g = 0; g < inf.data.holeCount; g++) {
                                            yards.querySelectorAll('.cell')[g].innerHTML = inf.data.holes[g].teeBoxes[players[num].tee].yards;
                                            score.querySelectorAll('.cell')[g].innerHTML = players[num].score[g];
                                            hcp.querySelectorAll('.cell')[g].innerHTML = inf.data.holes[g].teeBoxes[players[num].tee].hcp;
                                        }
                                        yards.querySelectorAll(".cell")[18].innerHTML = findIn('.yards');
                                        yards.querySelectorAll(".cell")[19].innerHTML = findOut('.yards');
                                        yards.querySelectorAll(".cell")[20].innerHTML = findTotal('.yards');
                                        score.querySelectorAll(".cell")[18].innerHTML = findIn('.score');
                                        score.querySelectorAll(".cell")[19].innerHTML = findOut('.score');
                                        score.querySelectorAll(".cell")[20].innerHTML = findTotal('.score');
                                        par.querySelectorAll(".cell")[18].innerHTML = findIn('.par');
                                        par.querySelectorAll(".cell")[19].innerHTML = findOut('.par');
                                        par.querySelectorAll(".cell")[20].innerHTML = findTotal('.par');
                                        hcp.querySelectorAll(".cell")[18].innerHTML = findIn('.hcp');
                                        hcp.querySelectorAll(".cell")[19].innerHTML = findOut('.hcp');
                                        hcp.querySelectorAll(".cell")[20].innerHTML = findTotal('.hcp');
                                    });
                                }
                                for (let g = 0; g < inf.data.holeCount; g++) {
                                    score.querySelectorAll(".cell")[g].addEventListener("click", function() {
                                        console.log(123)
                                        document.querySelector("body").classList.add("activeSelect");
                                        let select = document.querySelector(".select");
                                        select.innerHTML = "<p>Enter your score here</p><input type='number' min='0' class='num'></input><button class='submit'>Submit</button>";
                                        select.querySelector("button").addEventListener("click", function() {
                                            let myScore = select.querySelector("input").value;
                                            document.querySelector("body").classList.remove("activeSelect");
                                            score.querySelectorAll('.cell')[g].innerHTML = myScore;
                                            players[activePlayer].score[g] = parseInt(myScore);
                                            select.querySelector("input").value = "";
                                            console.log(players[activePlayer].score);
                                            score.querySelectorAll(".cell")[18].innerHTML = findIn('.score');
                                            score.querySelectorAll(".cell")[19].innerHTML = findOut('.score');
                                            score.querySelectorAll(".cell")[20].innerHTML = findTotal('.score');
                                        })
                                    })
                                }
                            } else {
                                console.log("wrong");
                            }
                        })
                    } else {
                        document.querySelector(".error").innerHTML = "Please enter a number between 1 and 4.";
                    }
                })
            }
        }
        https.open("GET", `https://golf-courses-api.herokuapp.com/courses/${info.courses[i].id}`, true);
        https.send();
    })
}

function findIn(obj) {
    let newIn = 0;
    for (let x = 0; x < 9; x++) {
        let epic = document.querySelector(obj).childNodes[x + 1];
        if (epic.innerHTML != "") {
            newIn += parseInt(epic.innerHTML);
        }
    }
    return newIn;
}

function findOut(obj) {
    let newIn = 0;
    for (let x = 9; x < 18; x++) {
        let epic = document.querySelector(obj).childNodes[x + 1];
        if (epic.innerHTML != "") {
            newIn += parseInt(epic.innerHTML);
        }
    }
    return newIn;
}

function findTotal(obj) {
    let newIn = 0;
    for (let x = 0; x < 18; x++) {
        let epic = document.querySelector(obj).childNodes[x + 1];
        if (epic.innerHTML != "") {
            newIn += parseInt(epic.innerHTML);
        }
    }
    return newIn;
}