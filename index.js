const express = require('express');
const mysql = require('mysql');
const app = express();
var exphbs  = require('express-handlebars');
const members = require('./members/Members'); 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true})); 


app.get('/',(req,res)=> res.render("home", { members}));

// get the middleware
app.use('/api/members', require('./middleware/api/memberapi'));


const PORT =    process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('port is runing at' + PORT);
})
