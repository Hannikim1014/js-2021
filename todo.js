const toDoForm = document.querySelector(".js-toDoForm"),    
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    completeList = document.querySelector(".js-complete")

const TODOS_LS = 'TODOS',
     COMPLETE_LS ='COMPLETE';

let toDos, completeTasks;

function getTaskObject(text){
    return {
        id : String(Date.now()),
        text
    };

}

function saveToDosPend(task){
      toDos.push(task);

}
function findInFinished(taskId){
    return completeTasks.find(function (task){
        return task.id === taskId;
    })
}

function findInPending(taskId){
    return toDos.find(function(task){
        return task.id === taskId;
    })
}
function removeFromToDos(taskId){
    toDos = toDos.filter(function (task){
        return task.id !== taskId;
    })
}

function removeFromComplete(taskId){
    completeTasks = completeTasks.filter(function (task){
        return task.id !== taskId;
    })

}

function addToComplete(task){
    completeTasks.push(task)
}
function addtoPend(task){
    toDos.push(task)
}

function deleteToDo(event){
    const li= event.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromComplete(li.id);
    removeFromToDos(li.id)
    saveToDos(); 
}
function handleFinishClick(e)
{
    const li=e.target.parentNode;
    li.parentNode.removeChild(li)
    const task = findInPending(li.id)
    removeFromToDos(li.id);
    addToComplete(task);
    paintToDoFinish(task);
    saveToDos();
}
function handleBackClick(e){
    const li = e.target.parentNode
    li.parentNode.removeChild(li)
    const task = findInFinished(li.id)
    removeFromComplete(li.id);
    addtoPend(task)
    paintToDoPend(task);
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(COMPLETE_LS,JSON.stringify(completeTasks)); // ANYTHING TO STRING! 
}

function buildGenericLi(task){
    const li = document.createElement("li");  // element create
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.innerHTML = "✔";
    span.innerText = task.text;
    delBtn.addEventListener("click",deleteToDo);
     li.append(span,delBtn); // span inside of the li
     li.id = task.id;
    return li;
}

function paintToDoFinish(task){
    const genericLi = buildGenericLi(task)
    const backBtn = document.createElement("button")
    backBtn.innerText = "💔"
    backBtn.addEventListener("click",handleBackClick)
    genericLi.append(backBtn)
    completeList.append(genericLi);
 
}
function paintToDoPend(task){
   const genericLi = buildGenericLi(task)
   const completeBtn = document.createElement("button");
   completeBtn.innerText="🧡"
   completeBtn.addEventListener("click",handleFinishClick);
   genericLi.append(completeBtn);
   toDoList.append(genericLi);
}

function handleSubmit(event)
{
    event.preventDefault();
    const taskObj = getTaskObject(toDoInput.value);
    toDoInput.value = "";
    paintToDoPend(taskObj);
    saveToDosPend(taskObj);
    saveToDos();
}

function restoreState(){
    toDos.forEach(function (task) {
        paintToDoPend(task);
    });
    completeTasks.forEach(function (task){
        paintToDoFinish(task);
    })
}
function loadToDos(){
   toDos = JSON.parse(localStorage.getItem(TODOS_LS)) || [];
   completeTasks = JSON.parse(localStorage.getItem(COMPLETE_LS)) || [];
}


 function init(){
        toDoForm.addEventListener("submit",handleSubmit)
        loadToDos()
        restoreState()
    }


    init();