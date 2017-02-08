const fs = require('fs');
let argv = process.argv;
let argv_command = argv.slice(2)

class Todo {
  constructor(path) {
    this.path = path  // letak file data.json (database)
  }

  readFile() {
    var list = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return list
  }

  writeFile(file) {
    fs.writeFileSync("data.json", file, "utf-8");
  }

  jsonStringify(file) {
    return JSON.stringify(file, false, 3);
  }

  help () {
    console.log(`
      Command:
      // 1. help
      // 2. list
      // 3. add <task_content>
      // 4. task <task_id>
      // 5. delete <task_id>
      // 6. complete <task_id>
      // 7. uncomplete <task_id>`);
  }

  list() {
    // panggil method readFile() agar DRY code
    let list = this.readFile()
    for (let i = 0; i < list.length; i++) {
      console.log(`${i+1}. [${list[i]["status"]}] ${list[i]["task"]}`);
    }
  }

  add() {
    // harus dirubah dulu ke array of object
    let list = this.readFile()
    let obj = JSON.parse(`{ "task": "${argv_command[1]}",
                            "id": "${list.length + 1}",
                            "status": "",
                            "created_date": "${new Date()}",
                            "tags": ""}`);
    // karena sifat nya sudah array, jadi kita bisa push object ke dalam array
    list.push(obj)
    // saat di masukkan, harus di convert lagi jadi string
    var json = this.jsonStringify(list)
    this.writeFile(json)
  }

  task() {
    let list = this.readFile()
    var index = argv_command[1] - 1;
    console.log(` Task ke ${argv_command[1]}, adalah ${list[ index ]["task"]} `);
  }

  delete() {
    let list = this.readFile()
    let index = argv_command[1] - 1
    delete list[index];   // 'delete' => untuk menghapus object berdasarkan index
    list.splice( index, 1 );
    console.log(`Task ke ${argv_command[1]} sudah di hapus`);
    var json = this.jsonStringify(list)
    this.writeFile(json)
  }

  complete() {
    let list = this.readFile()
    let index = argv_command[1] - 1;
    list[index]["status"] = "X";
    console.log(`Task ke ${argv_command[1]} sudah selesai dilakukan`);
    var json = this.jsonStringify(list)
    this.writeFile(json)
  }

  uncomplete() {
    let list = this.readFile()
    let index = argv_command[1] - 1;
    list[index]["status"] = "";
    console.log(`Status ke ${argv_command[1]} sudah selesai dirubah`);
    var json = this.jsonStringify(list)
    this.writeFile(json)
  }


}

let todoList = new Todo('data.json')

switch (argv_command[0]) {
  case 'help':
    todoList.help()
    break;
  case 'list':
    todoList.list()
    break;
  case 'add':
    todoList.add()
    break;
  case 'task':
    todoList.task()
    break;
  case 'delete':
    todoList.delete()
    break;
  case 'complete':
    todoList.complete()
    break;
  case 'uncomplete':
    todoList.uncomplete()
    break;

}
