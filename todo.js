'use strict'

const fs = require('fs')

class Todo {
    constructor(argv) {
        this.argv = argv
        this.initFile()
    }
    getCommand() {
        switch (this.argv[2]) {
            case undefined:
                this.showHelp()
                break;
            case 'help':
                this.showHelp()
                break;
            case 'show':
                this.readTask()
                break;
            case 'add':
                this.writeTask(this.getCommandParam())
                break;
            case 'complete':
                this.completeTask(this.getCommandParam())
                break;
            case 'uncomplete':
                this.completeTask(this.getCommandParam(), 'uncomplete')
                break;
            case 'delete':
                this.deleteTask(this.getCommandParam())
                break;
            default:

        }
    }

    initFile() {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (data === '') {
                fs.writeFile('data.json', '[]','utf8', (err) => {
                    // console.log(err)
                })
            }
        })
    }

    getCommandParam() {
        let result = ''
        for (var i = 3; i < this.argv.length; i++) {
           result += this.argv[i]+' '
        }
        return result
    }

    readTask() {
        fs.readFile('data.json', 'utf8', (err, data) => {
            let tasks = JSON.parse(data)
            for (let i = 0; i < tasks.length; i++) {
                console.log(`${tasks[i].id} [${(tasks[i].is_done ? 'X' : ' ')}] : ${tasks[i].task}`)
            }
        })
    }

    writeTask(task) {
        fs.readFile('data.json', 'utf8', (err, data) => {
            let tasks      = JSON.parse(data)
            let lastId     = tasks.length === 0 ? null : tasks[tasks.length-1].id
            let newId      = lastId === null ? 1 : lastId+1
            let newTask    = new Task(newId, task)//{"id":newId, "task":task, "is_done":false}
            tasks.push(newTask)
            let newTaskStr = JSON.stringify(tasks)
            fs.writeFile('data.json', newTaskStr,'utf8', (err) => {
                console.log(`Added "${task}" to your TODO list`)
            })
        })
    }

    deleteTask(id) {
        fs.readFile('data.json', 'utf8', (err, data) => {
            let tasks = JSON.parse(data)
            let deletedTask
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id == parseInt(id)) {
                    deletedTask = tasks[i].task
                    tasks.splice(i, 1)
                }
            }
            fs.writeFile('data.json', JSON.stringify(tasks),'utf8', (err) => {
                console.log(`Deleted "${deletedTask}" from your TODO list`)
            })
        })
    }

    completeTask(id, option = 'complete') {
        fs.readFile('data.json', 'utf8', (err, data) => {
            let tasks = JSON.parse(data)
            let completedTask
            let mark
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id == parseInt(id)) {
                    if (option === 'complete') {
                        completedTask    = tasks[i].task
                        mark             = 'done'
                        tasks[i].is_done = true
                    } else {
                        if (tasks[i].is_done === true) {
                            completedTask    = tasks[i].task
                            mark             = 'uncompleted'
                            tasks[i].is_done = false
                        }
                    }
                }
            }
            fs.writeFile('data.json', JSON.stringify(tasks),'utf8', (err) => {
                console.log(`You have marked "${completedTask}" as ${mark} from your TODO list`)
            })
        })
    }

    showHelp() {
        console.log(`
                            =========Welcome Master========
            --------You can give me command like given commands below-----
            1. Add todo task   : node todo.js add <fill your task>
            2. Delete todo task: node todo.js delete <id of your task>
            3. Mark as complete: node todo.js complete <id of your task>
            4. Show todo tasks : node todo.js show
            5. Show help       : node todo.js help
        `)
    }
}

class Task {
    constructor(id, whatTodo, isDone = false) {
        this.id             = id
        this.task           = whatTodo
        this.is_done        = isDone
    }
}


let argv = process.argv
let todo = new Todo(argv)
todo.getCommand()
