"use strict"

class jsTODO {
  constructor(command) {
    this.command = command
    this.data = JSON.parse(obj)
    this.content = ""
  }

  execute(command, content) {
    this.content = content

    switch(command) {
      case "help" :
        this.help()
        break

      case "list" :
        this.list()
        break

      case "add" :
        this.add(this.content.slice(1).join(' '))
        break

      case "task" :
        this.task(this.content.slice(1).join(' '))
        break

      case "delete" :
        this.delete(this.content.slice(1).join(' '))
        break

      case "complete" :
        this.complete(this.content.slice(1).join(' '))
        break

      case "uncomplete" :
        this.uncomplete(this.content.slice(1).join(' '))
        break

      default:
        this.help()
        break
    }
  }

  writeToFile() {
    let insertData = fs.writeFileSync('data.json', JSON.stringify(this.data))
  }

  help() {
    console.log("============================================================")
    console.log("Help - /")
    console.log("node todo.js - Help content")
    console.log("node todo.js help - Help content")
    console.log("node todo.js list - Show todo list")
    console.log("node todo.js add <task_content> - Add element to do")
    console.log("node todo.js task <task_id> - Show todo list by id")
    console.log("node todo.js delete <task_id> - Delete todo list by id");
    console.log("node todo.js complete <task_id> - Complete todo list by id")
    console.log("node todo.js uncomplete <task_id> - uncomplete todo list by id")
    console.log("============================================================")
  }

  list() {
    for (let i = 0; i < this.data.length; i++) {
      let status = (this.data[i].status) ? "x" : ' '
      console.log(i+1 + ". [" + status + "] " + this.data[i].task)
    }
  }

  add(content){
    this.data.push({ id : this.data.length + 1, task : content, status : false})
    this.writeToFile()
    console.log("Added \"" + content + "\" to your todo list")
  }

  task(content) {
    let index = content - 1
    let status = (this.data[index].status) ? "x" : ' '
    console.log(this.data[index].id + ". [" + status + "] " + this.data[index].task)
  }

  delete(content) {
    let index = content-1
    this.data.splice(index, 1)
    this.writeToFile()
    console.log("Deleted \"" + content + "\" to your todo list")
  }

  complete(content) {
    let index = Number(content)
    for (let i = 0; i < this.data.length; i++) {
      if ( this.data[i].id === index ) {
        this.data[i].status = true
      }
    }
    this.writeToFile()
    console.log("Completed \"" + content + "\" to your todo list")
  }

  uncomplete(content) {
    let index = Number(content)
    for (let i = 0; i < this.data.length; i++) {
      if ( this.data[i].id === index ) {
        this.data[i].status = false
      }
    }
    this.writeToFile()
    console.log("Uncompleted \"" + content + "\" to your todo list")
  }
}

// Parsing data from json file
let fs = require('fs')
var obj = fs.readFileSync("data.json", "utf-8")

// create new Object
let todo = new jsTODO()
let args = process.argv
let contentTask = args.slice(2)
todo.execute(args[2], contentTask)
