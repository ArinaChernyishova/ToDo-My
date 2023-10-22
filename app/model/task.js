class Task {
    constructor(text) {
        this.text = text;
        this.id = this.getNextId()
        this.complete = false
        this.time = this.timeNow() 
    }
    timeNow() {
        let date = new Date()
        return `${date.getHours()}:${pad(date.getMinutes(),2)}:${date.getSeconds()} ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
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