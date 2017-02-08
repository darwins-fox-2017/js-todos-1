
class Todo {
	constructor(list_data) {
		//this.data = json.readFileSync('data.json')
		this.list_data = list_data

	}

	Help() {
		switch(this.list_data[2]) {
			case "help" : 
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
			case "list" :
				this.listData()
				break;
			case "add" :
				this.addData()
				break;
			case "task" : 
				this.task()
				break;
			case "delete" :
				this.delete()
				break;
			case "complete" :
				this.complete()
				break;
			case "uncomplete" :
				this.uncompleted()
				break;

		}	
		// console.log(convert(arr))
	}

	listData() {
		console.log("====== Cek list data ======")
		for(let i = 0; i < readDataFile.length; i++) {
			if(readDataFile[i].completed === true) {
				console.log(`${i + 1}. [X] ${readDataFile[i].task}`)
			} else {
				console.log(`${i + 1}. [ ] ${readDataFile[i].task}`)
			}
		}
		
	}

	addData() {
		console.log("====== Add data record ======")
		let addthis = testargv.slice(3).join(" ")

		readDataFile.push({
			'id' : readDataFile.length+1,
			'task' : addthis,
			'completed' : false
		})
		console.log(`${addthis} ditambah`)


		fs.writeFileSync('data.json', JSON.stringify(readDataFile, false, 3), 'utf-8')

	}

	task() {
		for(let i = 0; i < readDataFile.length; i++) {
			if(readDataFile[i].id === readDataFile[3].id) {
				console.log(`readDataFile[i].id`)
			}
		}
		fs.writeFileSync('data.json', JSON.stringify(readDataFile, false, 3), 'utf-8')

	}

	delete() {

		delete readDataFile[testargv[3] -1]
		readDataFile.splice(testargv[3]-1, 1)
		console.log("Data di hapus")
		fs.writeFileSync('data.json', JSON.stringify(readDataFile, false, 3), 'utf-8')
	}

	complete() {
		console.log("Task yang ke - " + this.list_data[3])
				
		readDataFile[testargv[3] - 1].completed = true
		console.log(`${readDataFile[testargv[3] - 1].task} Completed!`)	
		fs.writeFileSync('data.json', JSON.stringify(readDataFile, false, 3), 'utf-8')
	}

	uncompleted() {
		// let uncompleted = testargv.slice(1).join(" ")
		readDataFile[testargv[3] - 1].completed = false

		console.log(`${readDataFile[testargv[3] - 1].task} uncompleted`)
		fs.writeFileSync('data.json', JSON.stringify(readDataFile, false, 3), 'utf-8')
	}	

}
const fs = require('fs')

let readDataFile = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
let testargv = process.argv

let todo_test = new Todo(testargv)
todo_test.Help()
