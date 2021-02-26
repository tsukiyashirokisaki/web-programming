var current = 0;
var imgurl = [
    "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__480.jpg",
    "https://cdn.pixabay.com/photo/2017/02/15/10/57/pizza-2068272_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/09/30/15/10/pizza-2802332_1280.jpg",
    "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
]
var max = imgurl.length;
var x = document.getElementById("display");
var next = document.getElementById("next");
var previous = document.getElementById("previous");
var url = document.getElementById("source");
previous.setAttribute("class", "disabled")
next.addEventListener("click", function () {
    if (current < max - 1) {
        current += 1;
        if (current == max - 1) {
            next.setAttribute("class", "disabled");
        }
        reload();
        previous.setAttribute("class", "image-viewer__button");

    }
});
previous.addEventListener("click", function () {
    if (current > 0) {
        current -= 1;
        if (current == 0) {
            previous.setAttribute("class", "disabled");
        }
        reload();
        next.setAttribute("class", "image-viewer__button");

    }
});
function reload() {
    x.setAttribute("src", "./images/loading.gif");
    x.setAttribute("src", imgurl[current]);
    url.setAttribute("href", imgurl[current]);
    url.textContent=imgurl[current];
}
reload();


