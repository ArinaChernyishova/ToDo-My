const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let taskList = []
class Task {
    constructor(text ) {
        this.text = text;
    }
}
function addTask() {
    if(inputBox.value === '') {
        alert('Вы должны что-то написать!')
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;        
        let t = new Task(li.textContent)
        taskList.push(t)
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function(event) {
    if(event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        saveData();
    } 
    else if (event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData() {
    localStorage.setItem("task-db", JSON.stringify(taskList))
}

function showTask() {
    let json = localStorage.getItem("task-db");
    const arr = JSON.parse(json);
    arr.forEach(function(element, key){
        let li = document.createElement("li");
        li.innerHTML = element.text
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });
    
} 

showTask();