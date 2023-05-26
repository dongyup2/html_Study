const box1 = document.querySelector(".box1");
const button1 = document.querySelector(".btn1");
const box2 = document.querySelector(".box2");
const button2 = document.querySelector(".btn2");

button1.onclick = () => {
    box1.classList.toggle("box-resize");
}
button2.onclick = () => {
    box2.classList.toggle("box-bg-change");
}

box1.onmouseover = () => {
    box1.classList.toggle("box-bg-change");
}

box1.onmouseover = () => {
    box1.classList.toggle("box-bg-change");
}