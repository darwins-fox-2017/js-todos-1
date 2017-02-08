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

        this.add(this.comment.slice(1).join(' '))
        break;

      case "task":

        this.task(this.comment.slice(1).join(''));
        break;

      case "delete":

        this.deleteData(this.comment.slice(1).join(''));
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
      })
      this.save()
      console.log("data has been added");
    }else{
      console.log("nothing to be added");
    }

  }

  task(id){
    let i = 0
    let flag = true
    while (flag) {
      if(id<=this.data.length){
        if(id == this.data[i].id){
          console.log(`${this.data[i].id}. ${this.data[i].status?'[x]':'[ ]'} ${this.data[i].task}`);
          flag = false
        }else{
          i++
        }
      }else{
        console.log('data is not found, see help!');
        flag = false
      }
    }
  }

  deleteData(id){
    let i = 0
    let flag = true
    while (flag) {
      if(id<=this.data.length){
        if(id == this.data[i].id){
          this.data.splice(i,1)
          console.log('data has been removed!');
          for (let j=id-1; j <this.data.length; j++) {
            this.data[j].id--
          }
          flag = false
        }
        else{
          i++
        }
      }else{
        console.log('data is not found, see help!');
        flag = false
      }
    }
    this.save()
  }

  complete(){

  }

  uncomplete(){

  }

  save(){
    jsonfile.writeFileSync("data.json",this.data)
  }

}

let jsonfile = require ('jsonfile')
let argv = process.argv
let list = new listToDo(argv.slice(2))

list.execute()
