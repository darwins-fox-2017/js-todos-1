const fs = require('fs')
let readFile = fs.readFileSync('data.json', 'utf-8') 
// console.log(readFile)
class Todo {
	constructor(list_data) {
		//this.data = json.readFileSync('data.json')
		this.list_data = list_data

	}

	Help() {
		// return list_data.push(this.data);
		// let argv = process.argv
		// let str = ""
		// for(let i = 2; i < argv.length; i++) {
		//   arr += argv[i] + " "
		// }
		switch(this.list_data[2]) {
			case "Help" : 
			console.log("$===================================$")
			console.log("$ node todo.js # will can help")
			console.log("$ node todo.js help")
			console.log("$ node todo.js list")
			console.log("$ node todo.js add <task_content>")
			console.log("$ node todo.js task <task_id>")
			console.log("$ node todo.js delete <task_id>")
			console.log("$ node todo.js complete <task_id>")
			console.log("$ node todo.js uncomplete <task_id>")
			break;
			case "List" :
			console.log("Hello")
		}	
		// console.log(convert(arr))
	}

	addData() {
		for(let i = 0; i < readFile.length; i++) {
			if(readFile[2] === "add") {
				let argvAdd = process.argv
			}
		}
		
	}


}
let testargv = process.argv
let todo_test = new Todo(testargv)
todo_test.Help()
