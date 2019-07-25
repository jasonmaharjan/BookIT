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
	database : 'bookit1'
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
  var category = req.body.search;
  con.query(

    "SELECT * FROM books WHERE title = ? OR author = ? OR category =?", [title, author,category], function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
    else{
      res.send({'success': false});
    }
  });
});

// user's uploaded books

app.post('/userbooks', function(req, res){

  var user = req.body.username;

  con.query(

    "SELECT * FROM books WHERE username = ? ", user, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
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

    else if (isNaN(ISBN)) {
      res.send({message: 'Please enter valid ISBN'});
    }

    else if (!title){
      res.send({message: 'Title is missing'});
    }

    else if (!author){
      res.send({message: 'Author is missing'});
    }

    else if (author.isAlpha){
      res.send({message: 'Please give valid author name'});
    }

    else if (!price){
      res.send({message: 'Price is missing'});
    }

    else if (isNaN(price)){
      res.send({message: 'Please give a valid price'});
    }

    else if (!edition){
      res.send({message: 'Please give the edition'});
    }

    else if (isNaN(edition)){
      res.send({message: 'Edition is not vali'});
    }

    else if (!category)
    {
      res.send({message: 'Please select a category'});
    }

    else if(!username){
      res.send({message: 'Please give a username'});
    }

    else if(description){
      res.send({message: 'Please write a description'});
    }

    else if (!image_URL){
      res.send({message: 'Please give an image URL'});;
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

//Removes the uploaded books
app.post('/removebooks', function(req, res){

  var book_ID=req.body.book_ID
        con.query(           
         /* "DELETE FROM books WHERE ISBN = ? AND title = ? AND author = ? AND price = ? AND edition = ? AND category = ? AND username = ? AND image_URL = ?",[ISBN, author, price, edition, category, username, image_URL] ,*/
         "DELETE FROM books WHERE book_ID = ?", book_ID,
          function(err, row, field){
            console.log(row);
            if (err) throw err;
    
            else {
            console.log('1 Book added to user sold');
    
            res.send({'success': true});
            }
          }
        )
});


//Stores it in books_sold table
app.post('/soldbooks', function(req, res){

  var ISBN = req.body.ISBN;
  var title = req.body.title;
  var author = req.body.author;
  var price = req.body.price;
  var edition = req.body.edition;
  var category = req.body.category;
  var username = req.body.username;
  var description = req.body.description;
  var image_URL = req.body.image_URL;
  var book_ID=req.body.book_ID

        con.query(            

          "INSERT INTO books_sold (ISBN, title, author, price, edition, category, username, description, image_URL,book_ID) VALUES ('" + ISBN + "', '" + title + "', '" + author + "', '" + price + "', '" + edition + "', '" + category + "', '" + username + "', '" + description + "','" + image_URL + "','" +book_ID + "' )",
          function(err, row, field){
    
            console.log(row);
            if (err) throw err;
    
            else {
            console.log('1 Book added to user sold');
    
            res.send({'success': true});
            }
          }
        )
});


// Find username

app.post('/username', function(req, res){

  var user = req.body.username;

  con.query(

    "SELECT * FROM users WHERE username = ? ", user, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send( row[0]);
    }
  });
});





// Displays the sold books of the user
app.post('/books_sold', function(req, res){

  var user = req.body.username;

  con.query(

    "SELECT * FROM books_sold WHERE username = ? ", user, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
  });
});


// Cart data 

app.post('/books_sold', function(req, res){

  var username =  req.body.username;
  var book_ID = req.body.book_ID;
  var count = req.body.count;

  con.query(

    "INSERT INTO book_order VALUES ('" + ISBN + "', '" + title + "','" +book_ID + "' )", user, function(error, row, field){

    if(error) console.log(error);

    if(row.length > 0){
      res.send(row);
    }
  });
});



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

