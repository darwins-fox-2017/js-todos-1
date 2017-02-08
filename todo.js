const fs = require('fs')

let data = JSON.parse(fs.readFileSync('data.json','utf-8'))
let argv = process.argv.slice(2)
// console.log(argv);

class Todo {
  constructor() {

  }

  help() {
    let help = `$ node todo.js`
    if (argv == 'help' || argv == '') {
      console.log(`${help} help`);
      console.log(`${help} list`);
      console.log(`${help} add <task_content>`);
      console.log(`${help} task <task_id>`);
      console.log(`${help} delete <task_id>`);
      console.log(`${help} completed <task_id>`);
      console.log(`${help} uncompleted <task_id>`);
    }
  }
  list() {
    for (let i = 0;i < data.length; i++) {
      if (data[i].completed == true) {
        console.log(`[X] ${i+1}. ${data[i].task}`);
      } else {
        console.log(`[ ] ${i+1}. ${data[i].task}`);
      }
    }
    // console.log(data);
  }

  add() {
    let addTask = argv.slice(1).join(' ')
    // console.log(addTask);
    data.push({
      "id"        : data.length+1,
      "task"      : addTask,
      "completed" : false
    })
    console.log(`===================================`);
    console.log(`${addTask} has been added`);
    console.log(`===================================`);
    fs.writeFileSync('data.json', JSON.stringify (data, null , 3), 'utf-8')
  }

  task() {
    if (data[argv[1]-1].completed == true) {
      console.log(`[X] ${data[argv[1]-1].id}. ${data[argv[1]-1].task}`);
    } else {
      console.log(`[ ] ${data[argv[1]-1].id}. ${data[argv[1]-1].task}`);
    }
  }

  delete() {
    let removeTask = argv.slice(1).join(' ')
    data.splice(argv[1]-1,1)
    for (let i = argv[1]-1; i < data.length; i++) {
      data[i].id--
    }
    // console.log(data);
    console.log(`===================================`);
    console.log(`task no. ${removeTask} has been deleted`);
    console.log(`===================================`);
    fs.writeFileSync('data.json', JSON.stringify (data, null , 3), 'utf-8')
  }

  completed() {
    let completedTask = argv.slice(1).join(' ')
    data[argv[1]-1].completed = true
    console.log(`===================================`);
    console.log(`task no. ${completedTask} set to completed`);
    console.log(`===================================`);
    fs.writeFileSync('data.json', JSON.stringify (data, null , 3), 'utf-8')
  }

  uncompleted() {
    let uncompletedTask = argv.slice(1).join(' ')
    data[argv[1]-1].completed = false
    console.log(`===================================`);
    console.log(`task no. ${uncompletedTask} set to uncompleted`);
    console.log(`===================================`);
    fs.writeFileSync('data.json', JSON.stringify (data, null , 3), 'utf-8')
  }
}

let todo = new Todo()

if (argv[0] == 'help' || argv == '') {
  todo.help()
} else if (argv[0] == 'list') {
  todo.list()
} else if (argv[0] == 'add') {
  todo.add()
} else if (argv[0] == 'task') {
  todo.task()
} else if (argv[0] == 'delete') {
  todo.delete()
} else if (argv[0] == 'completed') {
  todo.completed()
} else if (argv[0] == 'uncompleted') {
  todo.uncompleted()
}

// console.log(argv[1]);
