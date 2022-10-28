//  ##  If I am using postman, be careful with the option: body > json <<== use this one


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
//const session = require('express-session')
const tasks = require('./routes/tasks');
const User = require("./models/user");

require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//const MongoStore = require('connect-mongo');


//middleware
app.use(express.static('./public'))
app.use(express.json());


// const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URI, collection: 'sessions' })

// app.use(session({
//     secret: process.env.SECRET,
//     saveUninitialized: true,
//     resave: false,
//     store: sessionStore,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
//   }));


//it will be running this middleware until we use the <<next()>>
app.use('/api/v1/tasks', tasks)

app.post("/register", (req, res) => {
    console.log(req.body)
     bcrypt
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
        });
        user
            .save()
            .then((result) => {
                res.status(201).send({
                  message: "User Created Successfully",
                  result,
                });
              })
            .catch((error) => {
              res.status(500).send({
                message: "Error creating user",
                error,
              });
            });
      })
        .catch((e) => {
            res.status(500).send({
              message: "Password was not hashed successfully",
              e,
            });
          })
});


app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password)
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          console.log(token)
           //   return success response
            res.status(200).send({
              message: "Login Successful",
              email: user.email,
              token,
            });
        })

        

        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        })
    })
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
})


// free endpoint
app.get("/free-endpoint", (req, res) => {
  res.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (req, res) => {
  res.json({ message: "You are authorized to access me" });
});


// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(notFound)
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000


const start =  async () =>{
    try {
    // maybe I should use createConnection (?)
      await mongoose.connect(process.env.MONGO_URI)    //we are using process.env in order to access the .env file -it is a global variable-
        app.listen(port, console.log(`server is listening in port 3000 ....`));
    } catch (error) {
        console.log(error)
    }
}



start();