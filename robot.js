//机器人聊天模块
const request = require("request")
const { client } = require("./oicq")

const fs = require("fs")

var flag = 0;
client.on("message",msg =>{
	
	var a = msg.raw_message
	if(a == "关闭聊天"){
		flag = 0
	}
	else if(a == "开启聊天"){
		flag = 1
	}
	
	if(flag == 1){
		var result = "你好呀，我是亚子机器人."
		var results = request.post({
		    url:'http://api.tianapi.com/robot/index',
		    form:{
		    key:'c49849b470506d680697c9e94bcda286',question:`${msg}`
			     } 
		    },
		function (err,response,body ){
		    result = JSON.parse(body);
		    result = result["newslist"][0]["reply"];
			    })
		function data(){
				msg.group.sendMsg(`${result}`)
			}
		setTimeout(data, 1000);
		
	}
	else if(flag == 0){	
	}
})




















