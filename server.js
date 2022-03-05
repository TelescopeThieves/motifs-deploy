const express = require('express')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const methodOverride = require("method-override");
const logger = require('morgan')
const flash = require('express-flash')
// const mainRoutes = require('./routes/mainRoutes')
// const postRoutes = require('./routes/postRoutes')
// const authRoutes = require('./routes/authRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const API = require('./graphQL/API')
const { graphqlHTTP }= require('express-graphql')
const bodyParser = require('body-parser')

require('dotenv').config({path: './config/.env'})


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
  app.use(flash())
// app.use(methodOverride("_method")); //Use forms for put / delete
// app.use('/', mainRoutes)
// app.use('/post', postRoutes) 
// app.use('/auth', authRoutes)

// GraphQL
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP(API))


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}else{
  app.get('/', (req, res) => {
      res.send('Api running')
  })
}

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server is running, you better catch it!')
}) 