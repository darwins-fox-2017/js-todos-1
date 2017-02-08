var fs = require('fs')
var argv = process.argv

class todo {
  constructor() {
    this.data = JSON.parse(fs.readFileSync('data.json','utf-8'))
  }

  help(){
      console.log('$ node todo.js help');
      console.log('$ node todo.js list');
      console.log('$ node todo.js add <task_content>');
      console.log('$ node todo.js task <task_id>');
      console.log('$ node todo.js delete <task_id>');
      console.log('$ node todo.js complete <task_id>');
      console.log('$ node todo.js uncomplete <task_id>');
  }

  list(){
    for(var g=0; g<this.data.length;g++){
      // console.log("[ ] "+this.data[g].task)
      if(this.data[g].status === true){
        console.log("[x] "+this.data[g].task)
      }else{
        console.log("[ ] "+this.data[g].task)
      }
    }
  }


  add(kalimat){
    this.data.push({
        "id": this.data.length + 1,
        "task": kalimat,
        "status": false
    })
    fs.writeFileSync('data.json',JSON.stringify(this.data,null,3))
    return this.list()
  }

  delete(aidi){
    this.data.splice(aidi, 1)
    fs.writeFileSync('data.json',JSON.stringify(this.data,null,3))
    return this.list()
  }

  complet(aidi){
    this.data[aidi].status = true
    fs.writeFileSync('data.json',JSON.stringify(this.data,null,3))
    return this.list()
  }

  uncomplet(aidi){
    this.data[aidi].status = false
    fs.writeFileSync('data.json',JSON.stringify(this.data,null,3))
    return this.list()
  }

  task(aidi){
    if(this.data[aidi].status === true){
      console.log("[x] "+this.data[aidi].task)
    }else{
      console.log("[ ] "+this.data[aidi].task)
    }
  }
}
var a = new todo()

if(argv[2] == 'help') {
  a.help()
}else if(argv[2] == 'list'){
  a.list()
}else if(argv[2] == 'add'){
  var h = ""
  for(var k=3; k < argv.length; k++){
    h += argv[k]+" "
  }
  a.add(h.trim())
}else if(argv[2] == 'delete'){
  a.delete(argv[3])
}else if(argv[2] == 'complete'){
  a.complet(argv[3])
}else if(argv[2] == 'uncomplete'){
  a.uncomplet(argv[3])
}else if(argv[2] == 'task'){
  a.task(argv[3])
}else{
  a.help()
}
