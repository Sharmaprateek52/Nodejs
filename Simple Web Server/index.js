const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

//Just shortcut keys
const mimetypes = {
    "html" : "text/html",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpg",
    "png" : "image/png",
    "js" : "text/javascript",
    "css" : "text/css"
};

http.createServer( (req,res) => {
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(),unescape(uri));
    console.log("Loading" + uri);
    var stats;
    try{
        stats = fs.lstatSync(fileName);
    }catch(e){
        res.writeHead(404,{'Content-type' : 'text/plain'});
        res.write("404 not found!\n");
        res.end();
        return;
    }
    if(stats.isFile()){
        var mimeType = mimetypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200,{'Content-type':mimeType});
        
        var filestream = fs.createReadStream(fileName);
        filestream.pipe(res);
    }else if(stats.isDirectory()){
        res.writeHead(302,{
            'Location':'file.html'
        });
        res.end();
    }else{
        res.writeHead(500,{'Content-type':'text/plain'});
        res.write("Internal error!\n");
        res.end();
    }
}).listen(3000);