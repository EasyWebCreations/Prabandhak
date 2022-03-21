const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require("body-parser");
const { resolveInclude } = require("ejs");
// const bcrypt = require("bcrypt")
var reportlist = ["A", "B", "C"];
var settinglist = ["D", "E", "F"];
const con = mysql.createConnection({
	host     : 'us-cdbr-east-05.cleardb.net',
    port : 3306,
	user     : 'b0c522ab6e71be',
	password : '079c45a6',
	database : 'heroku_e064bc22a0a0a92'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
// Specific folder example
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))
// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/register', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/Add_Emp/add_employee.html'));
});
app.get('/dashboard', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/dashboard.html'));
});
app.get("/reports", function (req, res) {
   
    res.render("template", {
        pagename: "reports",
		imgname : "img/add_monthly.png",
		list : reportlist
    })
});

app.get("/settings", function (req, res) {
   
    res.render("template", {
        pagename: "settings",
		imgname : "img/add_employee.png",
		list : settinglist
    })
});
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let userid = request.body.userid;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (userid && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		con.query('SELECT * FROM users WHERE userid = ? AND password = ?', [userid, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.userid= userid;
				// Redirect to home page
				response.redirect('/dashboard');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
// app.post("/createUser", async (req,res) => {
// 	const EMP_ID = req.body.EMP_ID;
// 	const SITE_ID = req.body.SITE_ID;
// 	const EMP_NAME = req.body.EMP_NAME;
// 	db.getConnection( async (err, connection) => {
// 	 if (err) throw (err)
// 	 const sqlSearch = "SELECT * FROM emp_details WHERE user = ?"
// 	 const search_query = mysql.format(sqlSearch,[user])
// 	 const sqlInsert = "INSERT INTO emp_details VALUES (0,?,?)"
// 	 const insert_query = mysql.format(sqlInsert,[EMP_ID,SITE_ID,EMP_NAME])
// 	 // ? will be replaced by values
// 	 // ?? will be replaced by string
// 	 await connection.query (search_query, async (err, result) => {
// 	  if (err) throw (err)
// 	  console.log("------> Search Results")
// 	  console.log(result.length)
// 	  if (result.length != 0) {
// 	   connection.release()
// 	   console.log("------> User already exists")
// 	   res.sendStatus(409) 
// 	  } 
// 	  else {
// 	   await connection.query (insert_query, (err, result)=> {
// 	   connection.release()
// 	   if (err) throw (err)
// 	   console.log ("--------> Created new User")
// 	   console.log(result.insertId)
// 	   res.sendStatus(201)
// 	  })
// 	 }
// 	}) //end of connection.query()
// 	}) //end of db.getConnection()
// 	}) //end of app.post()


	app.post('/register', function(req, res) {

		console.log('req.body');
		console.log(req.body);
		res.write('You sent the EMP_ID "' + req.body.EMP_ID+'".\n');
		res.write('You sent the SITE_ID "' + req.body.SITE_ID+'".\n');
		res.write('You sent the EMP_NAME "' + req.body.EMP_NAME+'".\n');
		
		res.end()
		
		con.query("Insert into emp_details(EMP_ID, SITE_ID,EMP_NAME) VALUES ('"+req.body.EMP_ID+"' , '"+req.body.SITE_ID+"','"+req.body.EMP_NAME+"')",function(err, result)      
		{                                                      
		  if (err)
			 throw err;
		});
		});

//register logic end

// // http://localhost:3000/home
// app.get('/dashboard', function(request, response) {
// 	// If the user is loggedin
// 	if (request.session.loggedin) {
// 		// Output username
//         response.sendFile(__dirname + '/dashboard.html')
        
// 		// response.send('Welcome back, ' + request.session.userid + '!');
// 	} else {
// 		// Not logged in
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

app.listen(process.env.PORT || 3000,function()
{
    console.log("Server started!!")
});
