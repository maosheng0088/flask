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

function login(){
	connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	  port :'3306',
	  database : 'answer'
	})
}


var length = ""
var question = ""
var answer = " "
var number = 1

//此函数求题库长度
function lengths(){
	
	contion();
	connection.connect()
	connection.query('select id from subject order by id desc limit 1;', function (error, results) {
		if (error) throw error;
		length = results[0]["id"]
	})
	
	connection.end();
	
} 

//此函数取出问题和答案
function get(){
	contion()
	connection.connect()
	connection.query(`select answer,question from subject where id =${number}`, function (error, results) {
		if (error) throw error;
		question = results[0].question
		answer = results[0].answer
	})	
	connection.end();
	
}



//此函数包装上面三个函数取出问题和答案
function send(){
	lengths();
	setTimeout(() => {
	    number = Math.floor(Math.random()*`${length}`)+1
        get();
	}, 50)
	
}




var flag = 0;
var answer = 1
client.on("message.group",msg =>{
	
	var a = msg.raw_message
	if(a == "结束答题"){
		flag = 0
	}
	else if(a == "开始答题"){
		flag = 1
	}
	
	if(flag == 1){
		function data(){
			if(text.indexOf("答")>-1){
				var r = text.indexOf("答")+2
				var e = text.substring(r,text.length).trim()
				if(e==`${answer}`){
					msg.reply("恭喜你答对了", true)
					send();
					setTimeout(() => {
						msg.group.sendMsg(`${question}`)
					
					  // 100 毫秒之后运行
					}, 100)
				}
				else if(e != `${answer}`){
					msg.reply("很抱歉答错了", true)
				}
				else if(a == "pass"){
					msg.reply("Pass,进入下一题", true)
					send();
					setTimeout(() => {
						msg.group.sendMsg(`${question}`)
					  // 100 毫秒之后运行
					}, 100)
					
					
				}
			}
			else if(text.indexOf("答")==-1){
			
			}
		
	}	
		setTimeout(data, 500);
	}
	else if(flag == 0){
		
	}
})


