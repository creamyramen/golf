let course = document.querySelectorAll(".course"),
    info;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    for (let i = 0; i < 3; i++) {
        course[i].classList.remove("light");
        course[i].classList.add("dark");
    }
    document.querySelector("main").style.background = "#000";
    document.querySelector("nav").style.background = "#111";
    document.querySelector("body").style.background = "#000";
    document.querySelector(".title").style.color = "#fff";
}
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        if (event.matches) {
            for (let i = 0; i < 3; i++) {
                course[i].classList.remove("light");
                course[i].classList.add("dark");
            }
            document.querySelector("main").style.background = "#000";
            document.querySelector("nav").style.background = "#111";
            document.querySelector(".title").style.color = "#fff";
            document.querySelector("body").style.background = "#000";
        } else {
            for (let i = 0; i < 3; i++) {
                course[i].classList.remove("dark");
                course[i].classList.add("light");
            }
            document.querySelector("main").style.background = "#eee";
            document.querySelector("nav").style.background = "#3f51b5";
            document.querySelector(".title").style.color = "#000";
            document.querySelector("body").style.background = "#eee";
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

for (let a = 0; a < 3; a++) {
    course[a].addEventListener("click", function() {
        let https = new XMLHttpRequest();
        https.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let inf = JSON.parse(this.responseText),
                    card = document.querySelector(".card");
                console.log(inf);
                course[0].classList.add("going");
                setTimeout(function() {
                    document.querySelector(".title").classList.add('going');
                    course[1].classList.add("going");
                }, 100);
                setTimeout(function() {
                    course[2].classList.add("going");
                    document.querySelector("main").style.margin = "3em 0 0 -100vw"
                }, 200);
                setTimeout(function() {
                    document.querySelector("main").style.display = "none";
                }, 700);
                card.innerHTML = `<div class="info column">
                                    <div class="hole">
                                        <p>Hole</p>
                                    </div>
                                    <div class="tee">
                                        <select name="tees"></select>
                                         tee
                                    </div>
                                    <div class="yourScore">
                                        <p></p>
                                    </div>
                                    <div class="par">
                                        <p>Par</p>
                                    </div>
                                </div>`;
                for (let b = 0; b < inf.data.holes[0].teeBoxes.length; b++) {
                    if (inf.data.holes[0].teeBoxes[b].teeType != "auto change location") {
                        let option = document.createElement("option");
                        option.innerHTML = inf.data.holes[0].teeBoxes[b].teeType;
                        option.value = b;
                        document.querySelector("select").appendChild(option);
                    }
                }
                for (let c = 0; c < inf.data.holeCount; c++) {
                    let column = document.createElement("div");
                    column.classList.add("column");
                    column.innerHTML =
                        `<div class="hole">${inf.data.holes[c].hole}</div>
                        <div class="tee"></div>
                        <div class="yourScore"></div>
                        <div class="par">${inf.data.holes[c].teeBoxes[0].par}</div>`;
                    card.appendChild(column);
                }

                function IN(a) {
                    let epic = 0;
                    if (a == ".tee") {
                        for (let i = 0; i < (inf.data.holeCount / 2); i++) {
                            epic += inf.data.holes[i].teeBoxes[0].yards;
                        }
                        return (epic);
                    } else {
                        for (let i = 1; i < (inf.data.holeCount / 2) + 1; i++) {
                            if (document.querySelectorAll(a)[i].innerHTML == "") {
                                epic += 0;
                            } else {
                                epic += parseInt(document.querySelectorAll(a)[i].innerHTML);
                            }
                        }
                        return (epic)
                    }
                }

                function OUT(a) {
                    let epic = 0;
                    if (a == ".tee") {
                        for (let i = 9; i < inf.data.holeCount; i++) {
                            epic += inf.data.holes[i].teeBoxes[0].yards;
                        }
                        return (epic);
                    } else {
                        for (let i = 10; i < inf.data.holeCount + 1; i++) {
                            if (document.querySelectorAll(a)[i].innerHTML == "") {
                                epic += 0;
                            } else {
                                epic += parseInt(document.querySelectorAll(a)[i].innerHTML);
                            }
                        }
                        return (epic)
                    }
                }

                function TOTAL(a) {
                    let epic = 0;
                    if (a == ".tee") {
                        for (let i = 0; i < inf.data.holeCount; i++) {
                            epic += inf.data.holes[i].teeBoxes[0].yards;
                        }
                        return (epic);
                    } else {
                        for (let i = 1; i < inf.data.holeCount + 1; i++) {
                            if (document.querySelectorAll(a)[i].innerHTML == "") {
                                epic += 0;
                            } else {
                                epic += parseInt(document.querySelectorAll(a)[i].innerHTML);
                            }
                        }
                        return (epic)
                    }
                }
                let In = document.createElement("div");
                let out = document.createElement("div");
                let total = document.createElement("div");
                In.innerHTML =
                    `<div class="hole">
                            <p>In</p>
                        </div>
                        <div class="tee">
                            <p>${IN(".tee")}</p>
                        </div>
                        <div class="yourScore">
                            <p>${IN(".yourScore")}</p>
                        </div>
                        <div class="par">
                            <p>${IN(".par")}</p>
                        </div>`;
                out.innerHTML =
                    `<div class="hole">
                            <p>Out</p>
                        </div>
                        <div class="tee">
                            <p>${OUT(".tee")}</p>
                        </div>
                        <div class="yourScore">
                            <p>${OUT(".yourScore")}</p>
                        </div>
                        <div class="par">
                            <p>${OUT(".par")}</p>
                        </div>`;
                total.innerHTML =
                    `<div class="hole">
                            <p>Total</p>
                        </div>
                        <div class="tee">
                            <p>${TOTAL(".tee")}</p>
                        </div>
                        <div class="yourScore">
                            <p>${TOTAL(".yourScore")}</p>
                        </div>
                        <div class="par">
                            <p>${TOTAL(".par")}</p>
                        </div>`;
                In.classList.add("column");
                out.classList.add("column");
                total.classList.add("column");
                card.appendChild(In);
                card.appendChild(out);
                card.appendChild(total);
                for (let i = 0; i < inf.data.holeCount + 1; i++) {
                    document.querySelectorAll(".column")[i].querySelectorAll('div')[1].style.backgroundColor = inf.data.holes[0].teeBoxes[0].teeHexColor;
                    document.querySelectorAll(".column")[i].querySelectorAll('div')[1].style.color = "white";
                    if (document.querySelectorAll(".column")[i + 1] != undefined) {
                        if (inf.data.holes[i] != undefined) {
                            document.querySelectorAll(".column")[i + 1].querySelectorAll('div')[1].innerHTML = inf.data.holes[i].teeBoxes[0].yards;
                        }
                    };
                }
                document.addEventListener('input', function(e) {
                    let num = e.target.value;
                    for (let i = 0; i < inf.data.holeCount + 1; i++) {
                        document.querySelectorAll(".column")[i].querySelectorAll('div')[1].style.backgroundColor = inf.data.holes[0].teeBoxes[num].teeHexColor;
                        if (inf.data.holes[0].teeBoxes[num].teeHexColor == "#ffffff") {
                            document.querySelectorAll(".column")[i].querySelectorAll('div')[1].style.color = "black";
                        } else if (inf.data.holes[0].teeBoxes[num].teeHexColor == "#fffc00") {
                            document.querySelectorAll(".column")[i].querySelectorAll('div')[1].style.color = "black";
                        } else {
                            document.querySelectorAll(".column")[i].querySelectorAll('div')[1].style.color = "white";
                        }
                        if (document.querySelectorAll(".column")[i + 1] != undefined) {
                            if (inf.data.holes[i] != undefined) {
                                document.querySelectorAll(".column")[i + 1].querySelectorAll('div')[1].innerHTML = inf.data.holes[i].teeBoxes[0].yards;
                            }
                        };
                    }
                }, false)
            }
        };
        https.open("GET", `https://golf-courses-api.herokuapp.com/courses/${info.courses[a].id}`, true);
        https.send();
    });
}