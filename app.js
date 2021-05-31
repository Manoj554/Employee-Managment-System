const creatError=require('http-errors');
const express=require('express');
const app=express();
const path=require('path');
const port=8000;
const cookieParser=require('cookie-parser');
const logger=require('morgan');

const indexRouter=require('./index');
// const usersRouter=require('./users');





// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// ENDPOINTS
//  app.get('/', (req, res)=>{
//   res.render('login');
//  }); 

 app.use('/',indexRouter);





// app.get('/', (req, res)=>{

//  });





// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});