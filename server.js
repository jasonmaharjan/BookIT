var express = require('express');
var app  = express();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require ('express-validator');
var bcrypt = require('bcryptjs');

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

// Users API
app.get('/users', function(req, res){

	con.query('select * from users', function(error, results, fields){
        if(error) console.log(error);

        else{
          res.send(results);
        }

  });
});

// Books API

app.get('/books', function(req, res){
	con.query('select title, author from books', function(error, row, fields){
        res.send(row);
  });
});

app.post('/books', function(req, res){

  var title = req.body.search;
  con.query(

    "SELECT * FROM books WHERE title = ? ", title, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});

app.post('/login', function(req, res){

  var username = req.body.username;
  var password = req.body.password;

  con.query(

    "SELECT * FROM users WHERE username = ?", username, function(err, row, field){
      if (err){
        console.log(err);
        res.send({'success': false, 'message': 'Could not connect to db'});
      }

      else if (row.length > 0){

        bcrypt.compare(password, row[0].password, function(err, isMatch){

          if(err) throw err;

          if(isMatch){
            res.send({'success': true, 'message': row[0].username});
          }     
          
          else
          res.send({'success': false, 'message': 'Password is incorrect'});
        });
      }

      else{
        res.send({'success':false, 'message':'User not found'});
      }
    }
  )
});

app.post('/signup', function(req, res) {

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password_confirm = req.body.password_confirm;
  var phone_number = req.body.phone_number;

  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);
  req.checkBody('phone_number', 'Phone Number is required').notEmpty();

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

    else if (!phone_number){
      res.send({message:'Phone number missing'});
    }

    console.log(errors);
  }

  else{

    // Check if username is already taken

    con.query(
      "SELECT * FROM users WHERE username = ?", username, function(err, row, field){
        
        if (err) throw err;

        else if (row.length>0){
          res.send({'success': false});

          console.log('Username is already taken');
        }

        // If username is available

        else{
          
          // Password Encryption 

          bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, function(err, hash){

              if (err) throw err;
              
              password = hash;

              con.query(            

                "INSERT INTO users (username, email, password, phone_number) VALUES ('" + username + "', '" + email + "', '" + password + "','" + phone_number + "' )",
                 function(err, row, field){
  
                   if (err) throw err;                   
          
                   else {
                   console.log('1 user-record inserted');
    
                   res.send({'success': true});
                   }
                 }
              )
            })
          })
        }
      }
    )
  }
});

app.post('/addbook', function(req, res){

  var ISBN = req.body.ISBN;
  var title = req.body.title;
  var author = req.body.author;
  var price = req.body.price;
  var edition = req.body.edition;
  var username = req.body.username;
  var description = req.body.description;

  req.checkBody('ISBN', 'ISBN is required').notEmpty();
  req.checkBody('title', 'title is required').notEmpty();
  req.checkBody('author', 'author is not valid').notEmpty();
  req.checkBody('price', 'price is required').notEmpty();
  req.checkBody('edition', 'edition is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {

    res.send({message:'Please give all the information'});

    console.log(errors);
  }

  else{

    con.query(            

      "INSERT INTO books (ISBN, title, author, price, edition, username, description) VALUES ('" + ISBN + "', '" + title + "', '" + author + "', '" + price + "', '" + edition + "', '" + username + "', '" + description + "')",
      function(err, row, field){

        console.log(row);
        if (err) throw err;

        else {
        console.log('1 book-record inserted');

        res.send({'success': true});
        }
      }
    )
  }

})

const port = 3000;

app.set('port', process.env.port || port);
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

