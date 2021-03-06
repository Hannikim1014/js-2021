const form = document.querySelector(".js-form"), // all of them 
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";  
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); // using the default event -> submit and gone 
    const currentValue = input.value;
    paintGreeting(currentValue); // handle the eventprevent + input value are functioned 
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN); 
    greeting.innerText = `Have a lovely day, ${text}`;
}
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }
    else{
        paintGreeting(currentUser);
    }
}

function init(){
loadName()
}
init();