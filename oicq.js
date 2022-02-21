const EventEmitter = require('events').EventEmitter;   //导入事件监听
const event = new EventEmitter(); 
const mysql   = require('mysql')


const { segment } = require("oicq")
const { createClient } = require("oicq")
const account = 1503003563
const client = createClient(account)

client.on("system.online", () => console.log("Logged in!"))
var password = "woaini520.."

client.login("password")










exports.client = client
exports.event = event
exports.mysql = mysql


const robot = require("./robot")
const answer = require("./answer")
const insert = require("./insert")
