"use strict"

const json         = require('jsonfile')

class TodoList {
  constructor (command) {
    this.command   = command
    this.data      = json.readFileSync('data.json')
  }

  run() {
    switch (this.command[0]) {
      case 'help':
        this.help()
        break;
      case 'list':
        this.list()
        break;
      case 'add':
        this.add(this.command.slice(1).join(' '))
        break;
      case 'delete':
        this.delete(this.command.slice(1,2)[0])
        break;
      case 'complete':
        this.complete(this.command.slice(1,2)[0])
        break;
      case 'uncomplete':
        this.uncomplete(this.command.slice(1,2)[0])
        break;
      default:
        console.log('Please input correct command!');
        this.help()
    }
  }

  help() {
    let helpMenu = ["$ node todo.js # will call help",
                    "$ node todo.js help",
                    "$ node todo.js list",
	                  "$ node todo.js add <task_content>",
                    "$ node todo.js task <task_id>",
	                  "$ node todo.js delete <task_id>",
                    "$ node todo.js complete <task_id>",
	                  "$ node todo.js uncomplete <task_id>"]
  	 console.log(helpMenu.join("\n"))
  }

  list() {
    if (this.data.length > 0) {
      for (let i = 0; i < this.data.length; i++) {
        console.log(`${this.data[i].id}. [${this.data[i].completed ? "X" : " "}] ${this.data[i].task}`);
      }
    } else {
      console.log('-');
    }
  }

  save() {
    json.writeFileSync('data.json', this.data)
  }

  sort() {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].id = i+1
    }
    return this.data
  }

  add(string) {
      let formatAdd   = {"id": this.data.length+1, "task": string, "completed": false}
      this.data.push(formatAdd)
      this.sort()
      this.save()
      console.log("Success added "+string);
  }

  delete(id) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        console.log("Record deleted "+this.data[i].task);
        this.data.splice(i, 1)
        break
      }
    }
    this.sort()
    this.save()
  }

  complete(id) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        this.data[i].completed = true
        break
      }
    }
    this.save()
  }

  uncomplete(id) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        this.data[i].completed = false
        break
      }
    }
    this.save()
  }
}

let argv           = process.argv
let list           = new TodoList(argv.slice(2))

list.run()
