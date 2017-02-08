"use strict"

const fs = require('fs')
let data = JSON.parse(fs.readFileSync('data.json', 'UTF-8'))
let argv = process.argv
//

class Todo{
  constructor(comment){
    this.comment = comment
    // this.lastId = data[0].id +1
    // console.log(this.lastId)
    // this.idLast = this.comment[this.comment.length -1].id+1
  }
  help(){
    let node = "$ node todo.js"
    let menu = (`\n ${node} add <task content> \n ${node} list \n ${node} help \n ${node} delete <task_id> \n ${node} complete <task_id> \n ${node} uncomplete <task_id \n ${node} task <task_id>`);
      if(argv[2] === undefined || argv[2] === 'help'){
        console.log(`${menu}`)
      }
  }
  list(){
    // let listTodo = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == "complete") {
                console.log(`${data[i].id}. [X] ${data[i].task}`)
            } else {
                console.log(`${data[i].id}. [ ] ${data[i].task}`)
              }
          }
      }
  add(string){
      let arr = [];
        for (var i = 3; i < argv.length; i++) {
            arr.push(argv[i]);
        }
      let strings = arr.join(" ");
        data.push({
            "id": data.length +1,
            "task": strings,
            "status": "uncomplete"
        })
        fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
      }
    complete(){
         for (var i = 0; i < data.length; i++) {
             if (data[i].id == argv[3]) {
                 data[i].status = "complete";
                 fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
             }
         }
     }
  uncomplete(){
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == argv[3]) {
                data[i].status = "uncomplete";
                fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
            }
        }
    }
  delete(){
    data.splice(argv[3]-1, 1)
    for (var i = argv[3]-1; i < data.length; i++) {
      data[i].id--;
        // if (data[i].id == argv[3]) {
            // data.splice(i, 1);
            fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
        // }
    }
  }
  task(){
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == argv[3]) {
            console.log(data[i]);
            fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
        }
    }
  }
}

let Todos = new Todo();

switch(argv[2]){
  case 'help':
      Todos.help();
      break;
  case 'list':
      Todos.list();
      break;
  case 'add':
      Todos.add();
      break;
  case 'complete':
      Todos.complete();
      break;
  case 'uncomplete':
      Todos.uncomplete();
      break;
  case 'delete':
      Todos.delete();
      break;
  case 'task':
      Todos.task();
      break;
  default: 
      Todos.help();
}
