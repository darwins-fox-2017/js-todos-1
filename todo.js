const fs = require('fs')

class Task {
  constructor(name, id, status) {
    this.name = name
    this.id = id
    this.complete = status || false
  }
}
class Todo {
  constructor(task, file) {
    this._task = task
    this.lastId = 1
    this.file = file
  }
  addTask() {

  }

  help() {
    console.log(`- help - Display this message`)
    console.log(`- list - Display task list`)
    console.log(`- add - add 'value' to add task`)
    console.log(`- task - Display task detail`)
    console.log(`- delete - delete 'id' delete specific task by id`)
    console.log(`- complete - complete 'id' mark complete to specific task by id`)
    console.log(`- uncomplete - uncomplete 'id' mark uncomplete to specific task by id`)
  }
  list() {
    let theData = fs.readFileSync(this.file, "utf-8")
    let jsonData = JSON.parse(theData)
    for(let i=0; i<jsonData.length; i++) {
      this._task[i].id = i+1
      if(jsonData[i]['complete'] === false)
      console.log(`[ ] - ${i+1} - ${jsonData[i]['name']}`)
      else {
        console.log(`[X] - ${i+1} - ${jsonData[i]['name']}`)
      }
    }
    fs.writeFileSync(this.file, JSON.stringify(this._task), "utf-8")
  }
  add(taskData) {
    let newTask = new Task(taskData, this._task.length + 1)
    this._task.push(newTask)
    console.log(`Task untuk "${taskData}" sudah dimasukan`)
    fs.writeFileSync(this.file, JSON.stringify(this._task), "utf-8")
  }

  // menampilkan task detail
  taskId(id) {
    for(let i=0; i<this._task.length; i++) {
      if(this._task[i].id + 1 == id) {
      console.log(`- ID : ${this._task[i].id}`)
      console.log(`- Task : ${this._task[i].name}`)
      if(this._task[i].complete) {
          console.log(`- Is it Done : DONE`)
      } else {
          console.log(`- Is it Done : NO`)
        }
      break;
      }
    }
  }
  delete(id) {
    for(let i=0; i<this._task.length; i++) {
      if(this._task[i].id == id) {
        this._task.splice(id-1, 1)
        // console.log(this._task[id].name)
      }
    }
    fs.writeFileSync(this.file, JSON.stringify(this._task), "utf-8")
  }

  completed(id) {
    for(let i=0; i<this._task.length; i++) {
      if(this._task[i].id == id) {
        this._task[i].complete = true
        break;
      }
    }
    fs.writeFileSync(this.file, JSON.stringify(this._task), "utf-8")
  }
  uncomplete(id) {
    for(let i=0; i<this._task.length; i++) {
      if(this._task[i].id == id) {
        this._task[i].complete = false
        break;
      }
    }
    fs.writeFileSync(this.file, JSON.stringify(this._task), "utf-8")
  }
}

let readData = fs.readFileSync("data.json", "utf-8").split(',')
let jsonData = JSON.parse(readData)
let arrData = []
for(let i=0; i<jsonData.length; i++) {
  let newTask = new Task(jsonData[i]['name'], i+1, jsonData[i]['complete'])
  arrData.push(newTask)
}


// Read file .json, push data to new class Todo.
let doIt = new Todo(arrData, "data.json")

switch (process.argv[2]) {
  case "help":
    doIt.help()
    break;
  case "list":
  // console.log(doIt._task)
    if(doIt._task !== []) {
      doIt.list()
    } else {
      console.log("No list")
    }
    break;
  case "add":
    taskData = ''
    for(let i=3; i<process.argv.length; i++) {
      taskData += process.argv[i] + " "
    }
    doIt.add(taskData)
    break;
  case "task":
    doIt.taskId(process.argv[3])
    break;
  case "delete":
    doIt.delete(process.argv[3])
    break;
  case "complete":
    doIt.completed(process.argv[3])
    break;
  case "uncomplete":
    doIt.uncomplete(process.argv[3])
    break;
  default:
    doIt.help()
}
