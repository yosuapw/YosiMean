var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function compile(str, path) {
    return stylus(str).set('filename', path);
}

var app = express();

if (env === 'development') {
    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'jade');

    //add log
    app.use(morgan('combined'));
    app.use(bodyParser.raw());


    //add stylus compiler
    app.use(stylus.middleware({
        src: __dirname + '/public',
        compile: compile
    }));
    app.use(express.static(__dirname + '/public'));
};

//mongodb settings
mongoose.connect('mongodb://localhost/YosiMean');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error..'));
db.once('open', function callback() {
    console.log('YosiMean connected...');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('message', messageSchema);
var mongooseMessage;
Message.findOne().exec(function(err, messageDoc) {
    mongooseMessage = messageDoc.message;
})


app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongooseMessage
    });
});

var port = 3030;
app.listen(port);
console.log('app listen to '+ port + '....');