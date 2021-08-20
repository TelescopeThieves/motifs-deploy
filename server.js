const express = require('express')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require("method-override");
const logger = require('morgan')
const flash = require('express-flash')
const mainRoutes = require('./routes/mainRoutes')
const postRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

require('dotenv').config({path: './config/.env'})

require("./config/passport")(passport);

// connect to mongo DB
const connectDB = require('./config/database')
const clientPromise = connectDB()
                      .then(conn => conn.connection.getClient())


const app = express()

app.use(cookieParser())
app.use(express.static('public'))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(logger('dev'))

app.use(cors())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
// app.options('*', cors())

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ clientPromise }),
    })
  );


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use forms for put / delete
app.use(methodOverride("_method"));

app.use(flash())
app.use('/', mainRoutes)
app.use('/post', postRoutes) 
app.use('/auth', authRoutes)

// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))
}

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server is running, you better catch it!')
}) 