if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector(".course").style.backgroundColor = "#111";
    document.querySelector("main").style.backgroundColor = "#000";
    document.querySelector("nav").style.backgroundColor = "#111";
    document.querySelector(".title").style.color = "#fff";
}
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        if (event.matches) {
            document.querySelector(".course").style.backgroundColor = "#111";
            document.querySelector("main").style.backgroundColor = "#000";
            document.querySelector("nav").style.backgroundColor = "#111";
            document.querySelector(".title").style.color = "#fff";
        } else {
            document.querySelector(".course").style.backgroundColor = "##ff5252";
            document.querySelector("main").style.backgroundColor = "#eee";
            document.querySelector("nav").style.backgroundColor = "#3f51b5";
            document.querySelector(".title").style.color = "#000";
        }
    })

let http = new XMLHttpRequest();
http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let info = JSON.parse(this.responseText);
        for (let i = 0; i <= 2; i++) {
            console.log(i);
            let target = document.querySelector(`.c${i}`);
            target.querySelector("img").src = info.courses[i].image;
            target.querySelector("p").innerHTML = info.courses[i].name;
        }
    }
};
http.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
http.send();