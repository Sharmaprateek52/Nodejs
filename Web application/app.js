var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res) => {
    res.render('index',{title:'Welcome'});
});  

app.get('/about', (req,res) => {
    res.render('about');
});  

app.get('/contact', (req,res) => {
    res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'prateekkr12@gmail.com',//Your email
			pass: 'password'//your password
		}
	});

	var mailOptions = {
		from: 'Prateek Sharma <prateekkr12@gmail.com>',
		to: 'nikhilrocks71@gmail.com',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});


app.listen(3000,()=>{
    console.log("Server is live on port 3000!");
})
