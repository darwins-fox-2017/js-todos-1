class listToDo {
  constructor(comment) {
    this.comment = comment
    this.data = jsonfile.readFileSync('data.json')
  }

  execute(){
    switch (this.comment[0]) {
      case "help":

        this.help();
        break;

      case "list":

        this.list();
        break;

      case "add":

        let task = ""
        for (var i = 1; i < this.comment.length; i++) {
          task += this.comment[i] + " "
        }
        this.add(task.trim())
        break;

      case "task":

        this.list();
        break;

      default:
        console.log("command is not found see help!");
        this.help();
    }
  }

  help(){
    console.log(`==================================`);
    console.log(`Help Menu`);
    console.log(`==================================`);
    console.log(`$ node todo.js help`);
    console.log(`$ node todo.js list`);
    console.log(`$ node todo.js add <task_content>`);
    console.log(`$ node todo.js delete <task_id>`);
    console.log(`$ node todo.js complete <task_id>`);
    console.log(`$ node todo.js delete <task_id>`);
    console.log(`$ node todo.js uncomplete <task_id>`);
    console.log(`===================================`);
  }

  list(){
    for(let i=0; i<this.data.length; i++){
      console.log(`${this.data[i].id}. ${this.data[i].status?'[x]':'[ ]'} ${this.data[i].task}`);
    }
  }

  add(task){
    if(task) {
      this.data.push({
        "id"     : this.data.length + 1,
        "task"   : task,
        "status" : false
      })  // jsonfile.writeFileSync("data.json",task)
      jsonfile.writeFileSync("data.json",this.data)
      console.log("data has been added");
    }else{
      console.log("nothing to be added");
    }

  }

  task(id){
    // for (let i = 0; i < array.length; i++) {
    //   array[i]
    // }
  }

  deleteData(){

  }

  complete(){

  }

  uncomplete(){

  }

  save(){
    // jsonfile.writeFileSync("data.json",this.listArr)
  }

}

let jsonfile = require ('jsonfile')
let argv = process.argv
let list = new listToDo(argv.slice(2))

list.execute()
