const toDoForm = document.querySelector(".js-toDoForm"),    
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'
let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li= btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos(); 
}
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // ANYTHING TO STRING! 
}

function paintToDo(text){
    const li = document.createElement("li");  // element create
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId =  toDos.length +1;
    delBtn.innerHTML = "✔";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(span); // span inside of the li
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
        text: text,
        id: newId//array has a length and we can start from 1 ~ ...
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // help to understand it as an object 
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text)
        }) // runs a function : each one in array 
    }  
}



    function init(){
        loadToDos()
        toDoForm.addEventListener("submit",handleSubmit)
    }


    init();