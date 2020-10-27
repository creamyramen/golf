if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    for (let i = 0; i < 3; i++) {
        let course = document.querySelectorAll(".course")[i]
        course.style.background = "url('background2.jpg')";
        course.style.backgroundAttachment = "fixed";
        course.style.backgroundPosition = "center";
        course.style.backgroundRepeat = "no-repeat";
        course.style.backroundSize = "cover";
        // console.log(i)
    }
    document.querySelector("main").style.background = "#000";
    document.querySelector("nav").style.background = "#111";
    document.querySelector(".title").style.color = "#fff";
}
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        if (event.matches) {
            for (let i = 0; i < 3; i++) {
                let course = document.querySelectorAll(".course")[i]
                course.style.background = "url('background2.jpg')";
                course.style.backgroundAttachment = "fixed";
                course.style.backgroundPosition = "center";
                course.style.backgroundRepeat = "no-repeat";
                course.style.backroundSize = "cover";
                console.log(i)
            }
            document.querySelector("main").style.background = "#000";
            document.querySelector("nav").style.background = "#111";
            document.querySelector(".title").style.color = "#fff";
        } else {
            for (let i = 0; i < 3; i++) {
                let course = document.querySelectorAll(".course")[i]
                course.style.background = "url('background3.jpg')";
                course.style.backgroundAttachment = "fixed";
                course.style.backgroundPosition = "center";
                course.style.backgroundRepeat = "no-repeat";
                course.style.backroundSize = "cover";
                console.log(i)
            }
            document.querySelector("main").style.background = "#eee";
            document.querySelector("nav").style.background = "#3f51b5";
            document.querySelector(".title").style.color = "#000";
        }
    });

let http = new XMLHttpRequest();
http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let info = JSON.parse(this.responseText);
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