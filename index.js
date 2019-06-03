var express = require('express');
var app  = express();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require ('express-validator')

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

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Body parser middleware
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
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

app.get('/signup', function(req, res){
  res.send('User signup');
})


app.post('/signup', function(req, res) {

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password_confirm = req.body.password_confirm;

  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {

    if (!username){
      res.send({message:'Username missing'});
    }

    else if (!email){
      res.send({message:'Email missing'});
    }

    else if (!password){
      res.send({message:'Password missing'});
    }

    else if (password != password_confirm){
      res.send({message:'Passwords do not match'});
    }

    console.log(errors);
  }

  else{
    // Check if email is already taken
    con.query(
      "SELECT * FROM users WHERE email = ?", email, function(err, row, field){
        
        if (err) throw err;

        else if (row.length>0){
          res.send({'success': false});

          console.log('Email is already taken');
        }

        // If email is available
        else{
          con.query(

            "INSERT INTO users (username, email, password) VALUES ('" + username + "', '" + email + "', '" + password + "')",
             function(err, row, field){
               if (err) throw err;
      
               else {
               console.log('1 record inserted');

               res.send({'success': true});
               }
             }
          )
        }
      }
    )


  }
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

