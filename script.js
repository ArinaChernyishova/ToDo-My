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
        else if (element.tagName === 'SPAN') {
            removeTask(element)
        }
    }, false)

    showTask();
}

function addTask() {
    if(inputBox.value === '') {
        alert('Вы должны что-то написать!')
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;        
        let t = new Task(li.textContent)
        taskList.push(t)
        li.setAttribute(TASK_ID_ATTR, t.id);
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        let timeSpan = document.createElement("span");
        timeSpan.innerHTML = `${t.time}`
        li.appendChild(span);
        li.appendChild(timeSpan)
    }
    inputBox.value = '';
    saveData();
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
        `<li></li>`
        li.innerHTML = element.text
        li.setAttribute(TASK_ID_ATTR, element.id);
        console.log(element)
        if(element.complete == true) {
            console.log(element.complete)
            li.classList.toggle("checked")
        }
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        let timeSpan = document.createElement("span");
        timeSpan.innerHTML = `${t.time}`
        li.appendChild(timeSpan)
    });
    
} 

