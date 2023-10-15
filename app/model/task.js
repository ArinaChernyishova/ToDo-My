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