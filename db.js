var mysql = require('mysql');
const express = require ("express")
const bodyParser = require("body-parser")
const app = express();
const encoder = bodyParser.urlencoded();
app.get("/",function(request,response)
{
    response.sendFile(__dirname + "/index.html")
});
app.use(express.static("public"));
var con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "nodedb"
});
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // var sql = "CREATE TABLE users (username VARCHAR(255), password VARCHAR(255), user_desig VARCHAR(255))";
//     var sql = "INSERT INTO users (username, password, user_desig) VALUES ('test', 'test', 'admin')";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Record inserted");
//     });
//   });

// app.post("/",encoder,function(req,res)
// {
//     var userid = req.body.useid;
//     var password = req.body.password;
//     con.query("select * from users where userid = ? and password = ?",[userid,password],function(error,results,fields)
//     {
//         console.log("hello")
//         if(results.length > 0)
//         {
//             req.redirect('/dashboard')
//             console.log("hello")
//         }
//         else

//         {
//             res.redirect("/")
//         }
//         res.end();
//     })
// })
app.get("/dashboard",function(request,response)
{
    response.sendFile(__dirname + "/dashboard.html")
});

app.listen(process.env.PORT || 3000,function()
{
    console.log("Server started!!")
});

