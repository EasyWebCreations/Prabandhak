const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const con = mysql.createConnection({
	host     : 'us-cdbr-east-05.cleardb.net',
    port : 3306,
	user     : 'b0c522ab6e71be',
	password : '079c45a6',
	database : 'heroku_e064bc22a0a0a92'
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
app.use(express.static("public"));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/dashboard', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/dashboard.html'));
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
