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