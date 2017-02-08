fs = require('fs');
let data = JSON.parse(fs.readFileSync('data.json', 'UTF8'));
let args = process.argv
let help = ['node todo.js', 'node todo.js help']


switch() {
  case 'help' : console.log('========== MENU HELP ==========');
  case 'list' : console.log('========== MENU LIST ==========');
    for(var i = 0; i < data.length; i++) {
      if(data[i].complete == true) {
        console.log(`${data[i].id}. [x] ${data[i].task}`);
      } else {
        console.log(`${data[i].id}. [] ${data[i].task}`);
      }
    }
    break;
  case 'add' :
    let kata = args.splice(3, args.length-3);
    data.push({ 'id' ; data.length+1, 'task' : kata.join(' '), 'complete' : false})
    fs.writeFileSync('data.JSON')
}
