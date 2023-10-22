let taskList = []

let listContainer
let inputBox

window.onload = init()

function init() {
    inputBox = document.getElementById("input-box");
    listContainer = document.getElementById("list-container");

    listContainer.addEventListener('click', function(event) {
        let element = event.target;
        if(element.tagName === 'LI') {
            completeTask(element)
        } 
        else if (element.classList.contains('btn-delete')) {
            removeTask(element)
        }
    }, false)

    showTask();
}

function addTask() {
    if(inputBox.value === '') {
        alert('Вы должны что-то написать!')
    } else {
        let text = insertLineBrackets(inputBox.value);
        console.log(text)
        let t = new Task(text)
        taskList.push(t)
        let li = document.createElement("li");
        li.innerHTML = text        
        li.setAttribute(TASK_ID_ATTR, t.id);
        listContainer.appendChild(li);
        li.appendChild(getDeleteElement());
        li.appendChild(getTimeElemeent(t.time))
    }
    inputBox.value = '';
    saveData();
}
function insertLineBrackets(text) {
    text = ''+text
    while(text.includes("\n")) {
        text =text.replace("\n", '<br />');
    }
    return text
}

function getTimeElemeent(time) {
    let timeSpan = document.createElement("span");
    timeSpan.innerHTML = `<img src="img/time.svg"> ${time}`
    timeSpan.classList.add("time")
    return timeSpan;
}
function getDeleteElement() {
    let span = document.createElement("span");
    span.classList.add("btn-delete")
    span.innerHTML = "\u00d7";
    return span
}

function completeTask(element) {
    element.classList.toggle('checked');
    let id = element.getAttribute(TASK_ID_ATTR)
    let task = taskList.find(x => x.id == +id)
    task.complete = !task.complete
    saveData();
}

function removeTask(element) {
    element.parentElement.remove();
    let id = element.parentElement.getAttribute(TASK_ID_ATTR)
    taskList = taskList.filter( x=>x.id != id)
    saveData();
}



function saveData() {
    localStorage.setItem("task-db", JSON.stringify(taskList))
}

function showTask() {
    let json = localStorage.getItem("task-db");
    if(json!=null) {
        taskList = JSON.parse(json);
    }    
    taskList.forEach(function(element, key){
        let li = document.createElement("li");
        li.innerHTML = element.text
        li.setAttribute(TASK_ID_ATTR, element.id);
        if(element.complete == true) {
            console.log(element.complete)
            li.classList.toggle("checked")
        }
        listContainer.appendChild(li);
        li.appendChild(getDeleteElement());
        li.appendChild(getTimeElemeent(element.time))
    });
    
} 

