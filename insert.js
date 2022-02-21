const request = require("request")
const { client } = require("./oicq")
var mysql      = require('mysql');

function contion(){
	connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	  port :'3306',
	  database : 'answer'
	})
	
}

var Question ="1+1=?"
var Answer ="2"


function insert(){
	contion()
	connection.connect()
	connection.query(`insert into subject(question,answer) values("${Question}","${Answer}")`, function (error, results) {
		if (error) throw error;
	})	
	connection.end();
}

client.on("message", msg => {
	text = msg.raw_message
    if(text.substring(0,2).trim() =="问题"){
		var u = text.indexOf("答")
		Question = text.substring(3,`${u}`).trim()
		console.log(Question)
		var o = u+2;
	    Answer = text.substring(`${o}`,text.length).trim()
	    insert();
		setTimeout(() => {
		  msg.reply("已添加",true)
		}, 50)
		
	  
  }
  else if(text.substring(0,2).trim() !="问题"){
 
  }
  

})
