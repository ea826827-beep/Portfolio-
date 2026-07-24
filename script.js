
const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.onclick = () => {

navLinks.classList.toggle("active");

};
const words = [
  "Web Penetration Tester",
  "Security Learner",
  "JavaScript Developer",
  "Python Programmer"
];

let i = 0;
let j = 0;
let deleting = false;

const typing = document.getElementById("typing");

function type(){

    const word = words[i];

    if(!deleting){
        typing.textContent = word.substring(0,j++);
    }else{
        typing.textContent = word.substring(0,j--);
    }

    let speed = deleting ? 60 : 120;

    if(!deleting && j > word.length){
        deleting = true;
        speed = 1200;
    }

    if(deleting && j < 0){
        deleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type,speed);

}

type();
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

document.body.classList.toggle("light");

});
