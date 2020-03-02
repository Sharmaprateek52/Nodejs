var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res) => {
    res.render('index');
});  

app.listen(3000,()=>{
    console.log("Server is live on port 3000!");
})
