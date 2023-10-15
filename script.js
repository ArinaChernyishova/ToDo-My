const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let taskList = []
class Task {
    constructor(text ) {
        this.text = text;
        this.id = this.getNextId()
        this.complete = false
    }
    getNextId() {
        let counter =+localStorage.getItem("counter")
        if(counter == null) {
            counter = 0
            localStorage.setItem("counter", 1)
            return counter    
        }
        localStorage.setItem("counter", counter +1)
        return counter
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
        li.setAttribute("data-id", t.id);
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
        let id = event.target.getAttribute("data-id")
        let task = taskList.find(x => x.id == +id)
        task.complete = !task.complete
        saveData();
    } 
    else if (event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
        let id = event.target.parentElement.getAttribute("data-id")
        taskList = taskList.filter( x=>x.id != id)
        saveData();
    }
}, false)

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
        li.setAttribute("data-id", element.id);
        console.log(element)
        if(element.complete == true) {
            console.log(element.complete)
            li.classList.toggle("checked")
        }
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });
    
} 

showTask();