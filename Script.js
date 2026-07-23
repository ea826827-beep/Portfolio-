// Dark Mode

const themeBtn = document.getElementById("theme-btn");

themeBtn.onclick = () => {

document.body.classList.toggle("light");

themeBtn.innerHTML =
document.body.classList.contains("light")
? "☀️"
: "🌙";

};


// Counter Animation

const counters =
document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const count=+counter.innerText;

const speed=100;

const increment=target/speed;

if(count<target){

counter.innerText=
Math.ceil(count+increment);

setTimeout(update,20);

}else{

counter.innerText=target;

}

};

update();

});