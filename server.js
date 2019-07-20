var express = require('express');
var app  = express();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require ('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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
/*
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));*/

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

//JWT middleware
const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];

      req.token = token;
      next();
  } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403)
  }
}


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
	con.query('select * from books', function(error, row, fields){
        res.send(row);
  });
});

app.post('/books', function(req, res){

  var title = req.body.search;
  var author = req.body.search;
  con.query(

    "SELECT * FROM books WHERE title = ? OR author = ?", [title, author], function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});

app.get('/allbooks', function(req, res){
  con.query('select * from books', function(error, row, fields){
    res.send(row);
  });
});

app.post('/allbooks', function(req, res){
  con.query('select * from books', function(error, row, fields){
    res.send(row);
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
            const user = {
              id : row[0].id,
              email : row[0].email,
              username : row[0].username
            }

            jwt.sign({user}, 'secret' , { expiresIn: '1h' }, (err, token) => {
              if(err) { console.log(err) }    
              res.send({'success': true, 'message': row[0].username, token});
            }); 
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
  req.checkBody('phone_number', 'Phone Number must be a number').isNumeric();
  req.checkBody('phone_number', 'Phone Number is not valid').isLength(10);

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

    else if (phone_number.length != 10){
      res.send({message:'Phone number has invalid length'});
    }

    else {
      res.send({message: 'Please enter a valid phone number'});
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
  var category = req.body.category;
  var username = req.body.username;
  var description = req.body.description;
  var image_URL = req.body.image_URL;

  req.checkBody('ISBN', 'ISBN is required').notEmpty();
  req.checkBody('ISBN', 'ISBN is invalid').isLength(13);
  req.checkBody('ISBN', 'ISBN is invalid').isNumeric();
  req.checkBody('title', 'title is required').notEmpty();
  req.checkBody('author', 'author is required').notEmpty();
  req.checkBody('author', 'author is not valid').isAlpha();
  req.checkBody('price', 'price is required').notEmpty();
  req.checkBody('price', 'price is invalid').isNumeric();
  req.checkBody('edition', 'edition is required').notEmpty();
  req.checkBody('edition', 'edition is invalid').isNumeric();
  req.checkBody('category', 'category is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('image_URL', 'Image is missing').notEmpty();

  let errors = req.validationErrors();

  if (errors) {

    if (!ISBN){
      res.send({message:'ISBN is missing'});
    }

    else if (ISBN != 13){
      res.send({message: 'Please use ISBN-13 (13 digits)'})
    }

    else if (isNan(ISBN)) {
      res.send({message: 'Please enter valid ISBN'});
    }





    // Remaining Conditions

    
    res.send({message:'Please give all the information'});

    console.log(errors);
  }

  else{

    con.query(
      "SELECT * FROM users WHERE username =?", username, function(err, row, field){
        if (row.length > 0){
          con.query(            

            "INSERT INTO books (ISBN, title, author, price, edition, category, username, description, image_URL) VALUES ('" + ISBN + "', '" + title + "', '" + author + "', '" + price + "', '" + edition + "', '" + category + "', '" + username + "', '" + description + "','" + image_URL + "' )",
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
        else{
          res.send({'message': 'Invalid Username'});
        }
      }

    )


  }

})




// Math Category
app.post('/category/Mathematics', function(req, res){

  const M = 'Mathematics';

  con.query(

    "SELECT * FROM books WHERE category = ?", M, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});

// Physics Category
app.post('/category/Physics', function(req, res){

  const P = 'Physics';

  con.query(

    "SELECT * FROM books WHERE category = ?", P, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});

// Chemistry Category
app.post('/category/Chemistry', function(req, res){

  const C = 'Chemistry';

  con.query(

    "SELECT * FROM books WHERE category = ?", C, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});

// English Category
app.post('/category/English', function(req, res){

  const E = 'English';

  con.query(

    "SELECT * FROM books WHERE category = ?", E, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});

// Computer Category
app.post('/category/Computer', function(req, res){

  const C = 'Computer';

  con.query(

    "SELECT * FROM books WHERE category = ?", C, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});

// Programming Category
app.post('/category/Programming', function(req, res){

  const P = 'Programming';

  con.query(

    "SELECT * FROM books WHERE category = ?", P, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});






const port = 3000;

app.set('port', process.env.port || port);
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

