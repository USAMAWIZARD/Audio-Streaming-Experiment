app=require("express");

require("ejs");
server=app();
//Set View Engine To EJS
server.set("view engine", "ejs");
//Set Static Directory
server.use(app.static(__dirname));
const bodyParser= require('body-parser');
server.use(bodyParser.urlencoded({extended:true}))
const url = require('url');


server.listen(
    3000)
server.get("/",(req,res)=>{
    console.log("fasddsfasd");
    res.render("index.ejs");
});