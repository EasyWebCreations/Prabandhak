const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require("body-parser");
const { resolveInclude } = require("ejs");
// const bcrypt = require("bcrypt")
var reportlist = ["PF Format", "ESIC Format", "NEFT Format", "Custom Report", "logout"];
var settinglist = ["Site Settings", "Employee Settings", "Change Password", "Salary Settings", "Log Out"];
const con = mysql.createConnection({
	host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "node"

  	// host     : 'us-cdbr-east-05.cleardb.net',
    // port : 3307,
	// user     : 'b0c522ab6e71be',
	// password : '079c45a6',
	// database : 'heroku_e064bc22a0a0a92'
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	
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
		imgname : "img/settings.png",
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


	app.post('/register', function(req, res) {

		console.log('req.body');
		console.log(req.body);

		// page 1
		res.write('You sent the Firm "' + req.body.FIRM+'".\n');
		res.write('You sent the SITE_ID "' + req.body.SITE_ID+'".\n');
		res.write('You sent the EMP_NAME "' + req.body.EMP_NAME+'".\n');
		res.write('You sent the EMP_MOBILE"' + req.body.EMP_MOBILE+'".\n');
		res.write('You sent the AADHAR "' + req.body.AADHAR+'".\n');
		res.write('You sent the EMP_ADDRESS "' + req.body.EMP_ADDRESS+'".\n');
		res.write('You sent the PAN "' + req.body.PAN+'".\n');
		
// page 2
		res.write('You sent the UAN_NO "' + req.body.UAN_NO+'".\n');
		res.write('You sent the ESIC_NO "' + req.body.ESIC_NO+'".\n');
		res.write('You sent the BANK_AC_NO "' + req.body.BANK_AC_NO+'".\n');
		res.write('You sent the IFSC_CODE "' + req.body.IFSC_CODE+'".\n');
		res.write('You sent the BNK_NAME "' + req.body.BNK_NAME+'".\n');
		res.write('You sent the BNK_ADDRESS "' + req.body.BNK_ADDRESS+'".\n');
		
		// page 3
		res.write('You sent the DESIGNATION "' + req.body.DESIGNATION+'".\n');
		res.write('You sent the CATEGORY "' + req.body.CATEGORY+'".\n');
		res.write('You sent the BASIC_SAL "' + req.body.BASIC_SAL+'".\n');
		res.write('You sent the HRA_SAL "' + req.body.HRA_SAL+'".\n');
		res.write('You sent the SPL_ALLOW "' + req.body.SPL_ALLOW+'".\n');
		res.write('You sent the STATUS "' + req.body.STATUS+'".\n');
		
		con.query("Insert into emp_details(FIRM, SITE_ID,EMP_NAME,EMP_MOBILE,AADHAR,EMP_ADDRESS,PAN,UAN_NO,ESIC_NO,BANK_AC_NO,IFSC_CODE,BNK_NAME,BNK_ADDRESS,DESIGNATION,CATEGORY,BASIC_SAL,HRA_SAL,SPL_ALLOW,STATUS) VALUES('"+req.body.FIRM+"' , '"+req.body.SITE_ID+"','"+req.body.EMP_NAME+"' , '"+req.body.EMP_MOBILE+"' , '"+req.body.AADHAR+"' , '"+req.body.EMP_ADDRESS+"', '"+req.body.PAN+"','"+req.body.UAN_NO+"', '"+req.body.ESIC_NO+"', '"+req.body.BANK_AC_NO+"', '"+req.body.IFSC_CODE+"', '"+req.body.BNK_NAME+"', '"+req.body.BNK_ADDRESS+"','"+req.body.DESIGNATION+"', '"+req.body.CATEGORY+"', '"+req.body.BASIC_SAL+"', '"+req.body.HRA_SAL+"', '"+req.body.SPL_ALLOW+"', '"+req.body.STATUS+"')",function(err, result)     
		{                                                      
		  if (err)
			 throw err;
		console.log("success");
		});
		res.end()
		
		
		});
// router.get('/user-list', function(req, res, next) {
// 			var sql='SELECT * FROM users';
// 			db.query(sql, function (err, data, fields) {
// 			if (err) throw err;
// 			res.render('user-list', { title: 'User List', userData: data});
// 		  });
// 		});
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
