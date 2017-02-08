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
    if (this.data > 0) {
      for (let i = 0; i < this.data.length; i++) {
        console.log(`${this.data[i].id}. [${this.data[i].completed ? "X" : " "}] ${this.data[i].task}`);
      }
    } else {
      console.log('-');
    }
  }
}

let argv           = process.argv
let list           = new TodoList(argv.slice(2))

list.run()
