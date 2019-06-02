var express = require('express');
var app  = express();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');

var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'localhost',
	user     : 'root',
	password : '#jimmypage8877#',
	database : 'bookit'
});

con.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.post('/', function(req, res){

  var email = req.body.email;
  var password = req.body.password;

  con.query(

    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password], function(err, row, field){

      if(err){
        console.log(err);
        res.send({'success': false, 'message': 'Could not connect to db'}); 
      }

      if (row.length>0){
        res.send({'success': true, 'message': row[0].email });
      }

      else{
        res.send({'success':false, 'message':'User not found'});
      }
    }
  )

});


app.post('/signup', function(req, res) {

  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  res.write('You sent the fname "' + req.body.fullname + '".\n');
  res.write('You sent the email "' + req.body.email + '".\n');
  res.write('You sent the password "' + req.body.password + '".\n');

  con.connect(function(err) {
    if (err) throw err;

    var sql = "INSERT INTO users (fullname, email, password) VALUES ('" + fullname + "', '" + email + "', '" + password + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.end();
    });
  });
})

app.get('/users', function(req, res){

	con.query('select * from users', function(error, results, fields){
        if(error) console.log(error);

        else{
            res.send(results);
        }

  });
});


const port = 3000;

app.set('port', process.env.port || port);
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

