const fs = require('fs');
var readFile = fs.readFileSync('data.json', 'utf-8');
var listData = JSON.parse(readFile);

class TodoList {
    constructor(input) {
        this.listData = input;
    }

    writeToFile() {
        fs.writeFileSync("data.json", JSON.stringify(this.listData), "utf-8")
    }

    inputToList(task) {
        this.listData.push({
            "id": this.listData.length,
            "task": task,
            "complete": false
        })
    }

    sortId() {
      for(let i=0; i < this.listData.length; i++){
        this.listData[i].id = i+1
      }
      return this.listData
    }

    controller() {
        let listMenu = [
            "node todo.js # will call help",
            "node todo.js help",
            "node todo.js list",
            "node todo.js add <task_content>",
            "node todo.js task <task_id>",
            "node todo.js delete <task_id>",
            "node todo.js complete <task_id>",
            "node todo.js uncomplete <task_id>"
        ];

        let argv = process.argv

        if (argv[2] == undefined || argv[2] == "help") {
            for (let i = 0; i < listMenu.length; i++) {
                console.log(listMenu[i]);
            }
        }

        if (argv[2] == "list") {
            for (var i = 0; i < listData.length; i++) {
                if (listData[i].complete === true) {
                    console.log(`${listData[i].id} [x] ${listData[i].task}`)
                } else {
                    console.log(`${listData[i].id} [ ] ${listData[i].task}`)
                }
            }
        }

        if (argv[2] == "add") {
            if (argv[3] == undefined) {
                console.log('write something what is your input dude !');
            } else {
                this.inputToList(argv.splice(3, argv.length));
                this.sortId()
                this.writeToFile();
            }
        }

        if (argv[2] == "task") {
            if (argv[3] === undefined) {
                console.log('write task u need know dude !');
            } else {
                // console.log(`${listData[i].id} [ ] ${listData[i].task}`)
                console.log(`task ${argv[3]} : ${listData[argv[3]-1].task}`)
            }
        }

        if (argv[2] == "delete") {
            if (argv[3] === undefined) {
                console.log('what number u need to delete dude !');
            } else {
                console.log(`task ${argv[3]} File deleted dude !`)
                listData.splice(parseInt(argv[3]) - 1, 1)
                this.sortId()
                this.writeToFile()
            }
        }

        if (argv[2] == "complete") {
            if (argv[3] === undefined) {
                console.log('what number task u need to complete !');
            } else {
                console.log(`${listData[argv[3]-1].id} [x] ${listData[argv[3]-1].task}`);
                listData[argv[3] - 1].complete = true
                this.sortId()
                this.writeToFile()

            }

        }

        if (argv[2] == "uncomplete") {
            if (argv[3] === undefined) {
                console.log('what number task u need to UNCOMPLETE dude !');
            } else {
                console.log(`${listData[argv[3]-1].id} [ ] ${listData[argv[3]-1].task}`);
                listData[argv[3] - 1].complete = false
                this.sortId()
                this.writeToFile()
            }
        }
    }
}
let result = new TodoList(listData);
result.controller()

// process.argv.forEach((val, index) => {
//   console.log(TodoList(val));
// });
