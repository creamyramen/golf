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
            // console.log(i);
            let target = document.querySelector(`.c${i}`);
            target.querySelector("img").src = info.courses[i].image;
            target.querySelector("p").innerHTML = info.courses[i].name;
        }
    }
};
http.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
http.send();

for (let i = 0; i < 3; i++) {
    course[i].addEventListener("click", function() {
        let https = new XMLHttpRequest();
        https.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let inf = JSON.parse(this.responseText),
                    card = document.querySelector(".card");
                console.log(inf);
                document.querySelector("main").style.display = "none";
                card.innerHTML = `<div class="info column"><div class="hole"><p>Hole</p></div><div class="par"><p>Par</p></div><div class="yourScore"><p></p></div></div>`;
                for (let i = 0; i < inf.data.holeCount; i++) {
                    let column = document.createElement("div");
                    column.classList.add("column");
                    column.innerHTML = `<div class="hole"><p>${inf.data.holes[i].hole}</p></div><div class="par"><p>${inf.data.holes[i].teeBoxes[0].par}</p></div><div class="yourScore"><p contenteditable="false"></p></div>`;
                    card.appendChild(column);

                }
            }
        };
        https.open("GET", `https://golf-courses-api.herokuapp.com/courses/${info.courses[i].id}`, true);
        https.send();
    });
}