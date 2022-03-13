const express = require ("express")

const app = express();

app.get("/",function(request,response)
{
    response.sendFile(__dirname + "/index.html")
});
app.use(express.static("public"));
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
app.get("/dashboard",function(request,response)
{
    response.sendFile(__dirname + "/dashboard.html")
});

app.listen(process.env.PORT || 3000,function()
{
    console.log("Server started!!")
});