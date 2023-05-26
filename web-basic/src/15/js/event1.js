const box1 = document.querySelector(".box1");
const changeBtn = document.querySelector(".change-btn");

changeBtn.onclick = () => {
    box1.classList.toggle("bg-color");
}