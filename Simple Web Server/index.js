var http = require('http');
http.createServer( (req,res) => {
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    res.write("This is a simple a web server");
    res.end();
}).listen(3000);

console.log('Server is running on "http://127.0.0.1:3000/"');