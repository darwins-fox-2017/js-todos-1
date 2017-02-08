//class for todo
class toDo {
  constructor(fileName) {
    this.file=fileName;
  }
//menampilkan task yang ada
  list(){
    let file=this.file;
    let dataInFile = ReadWriteJson.readJson(file);
    //console.log(dataInFile.length);
    if (dataInFile.length<1) {
      console.log('belum ada list todo');
    } else {
      for (var i = 0; i < dataInFile.length; i++) {
      let id = dataInFile[i].id;
      let detail = dataInFile[i].detail;
      let mark;
      if (dataInFile[i].mark) {
        mark='[x]'
      } else {
        mark='[ ]'
      }
      console.log(`${id}. ${mark} ${detail}`);
      }
    }

  }

//menambahkan task baru
  addTask(detailTask){
    let file=this.file;
    let dataInFile = ReadWriteJson.readJson(file);
    let taskProp={};
    if (dataInFile.length==0) {
      taskProp['id']=1
    }else {
      taskProp['id']=dataInFile[dataInFile.length-1].id+1;
    }
    taskProp['detail'] = detailTask;
    taskProp['createDate'] = new Date();
    let taskObj = new task(taskProp);
    dataInFile.push(taskObj);
    console.log(`${detailTask} berhasil ditambaahkan dengan id ${taskProp.id}`);
    ReadWriteJson.writeJson(file,dataInFile);
  }


  help(){
    console.log('------menu-------');
    console.log('node todo.js = menapilkan menu yang ada (help)' );
    console.log('node todo.js help = menapilkan menu yang ada (help)' );
    console.log('node todo.js list = menapilkan list task' );
    console.log('node todo.js add task baru= menambahkan "task baru" kedalam list task' );
    console.log('node todo.js delete i = menghapus task ke i didalam list' );
    console.log('node todo.js markDone i = memberi tanda done pada task ke i ' );
    console.log('node todo.js markUnDone i = menghapus tanda done pada task ke i ' );
    console.log('');
  }

  getStringFromArgv(argument){
    let string=[]
    for (var i = 3; i < argument.length; i++) {
      string.push(argument[i]);
    }
    return string.join(' ');
  }

  deleteTask(number){
    let file = this.file;
    let dataInFile = ReadWriteJson.readJson(file);
    for (var i = 0; i < dataInFile.length; i++) {
      if (dataInFile[i].id == number ) {
        console.log(`${dataInFile[i].detail} berhasil dihapus`);
        dataInFile.splice(i,1);
      }
    }
  for (var i = 0; i < dataInFile.length; i++) {
    dataInFile[i].id=i+1;
  }
  //console.log(dataInFile);
    ReadWriteJson.writeJson(file,dataInFile);

  }

  markComplete(number){
    let file = this.file;
    let dataInFile = ReadWriteJson.readJson(file);
    for (var i = 0; i < dataInFile.length; i++) {
      if (dataInFile[i].id == number ) {
        dataInFile[i].mark = true;
        console.log(`${dataInFile[i]} di tandai selesai`);
      }
    }
    ReadWriteJson.writeJson(file,dataInFile);
  }

  markUnComplete(number){
    let file = this.file;
    let dataInFile = ReadWriteJson.readJson(file);
    for (var i = 0; i < dataInFile.length; i++) {
      if (dataInFile[i].id == number ) {
        dataInFile[i].mark = false;
        console.log(`${dataInFile[i]} di tandai belum selesai`);
      }
    }
    ReadWriteJson.writeJson(file,dataInFile);
  }

}

//membaca dan menulis JSON
class ReadWriteJson{
//membaca JSON
  static readJson(file){
     let fs = require('fs');
     let data = fs.readFileSync(file);

     if(data.toString()){
       return JSON.parse(data);
     }else{
       return [];
     }
 }

//Menulis JSON
   static writeJson(file,objToWrite){
     let fs = require('fs');
     objToWrite = JSON.stringify(objToWrite);
     fs.writeFileSync(file,objToWrite);
   }

}

//class all about task
class task {
  constructor(taskProp) {
    this.id = taskProp.id;
    this.mark = taskProp.mark||false;
    this.detail = taskProp.detail;
    this.createDate = taskProp.createDate;
    this.doneDate = taskProp.doneDate;
  }
}

//console.log(ReadWriteJson.readJson('data.json'));


let argv = process.argv;
if (argv.length<3) {
  let todo = new toDo('data.json');
  todo.help();
}else if (argv.length>=3) {
  let todo = new toDo('data.json');
  switch (argv[2].toLocaleLowerCase()) {
    case 'help':
     todo.help();
    break;

    case 'list':
     todo.list();
    break;

    case 'add':
    let detail = todo.getStringFromArgv(argv);
    todo.addTask(detail);
    break;

    case 'delete':
    todo.deleteTask(argv[3]);
    break;

    case 'markdone':
    todo.markComplete(argv[3]);
    break;

    case 'markundone':
    todo.markUnComplete(argv[3]);
    break;
    default:

  }
}
