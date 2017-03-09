/**
 * app entrance
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var port = process.env.PORT || 3000;
var flash = require('connect-flash');
var winston = require('winston')
var expressWinston = require('express-winston')
var routes = require('./config/routes');
var app = express();
var fs = require('fs');

// models loading
var modelsPath = __dirname + '/app/models';
var walk = function(path)
{
    fs.readdirSync(path).forEach(function(file) {
        var modelFilePath = path + '/' + file;
        var stat = fs.statSync(modelFilePath);
        if (stat.isFile()) {
            if (/(.*)\.(js)/.test(file)) {
                require(modelFilePath);
            }
        }
        else if (stat.isDirectory()) {
            walk(modelFilePath);
        }
    });
};
walk(modelsPath);

// all environments
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(flash());
app.use(express.cookieParser());
app.use(express.favicon());
app.use(bodyParser.json({
    extended: true,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}));
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}));
app.use(express.bodyParser({
    uploadDir: __dirname + '/public/upload'
}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

var logRequest = expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ],
    meta: true,
    expressFormat: true,
    colorStatus: true,
    ingoreRoute: function(req, res) { return false; }
})

function logResponseBody(req, res, next) 
{
    var oldWrite = res.write;
    var oldEnd = res.end;
    var chunks = [];

    res.write = function (chunk) {
        chunks.push(new Buffer(chunk));
        oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk) {
            chunks.push(new Buffer(chunk));
        }

        var body = Buffer.concat(chunks).toString('utf8');
        console.log(body);
        oldEnd.apply(res, arguments);
    };

    next();
}

// development only
if ('development' == app.get('env'))
{
    app.set('showStackError', true);
    app.use(express.errorHandler());
    app.use(logRequest);
    app.use(logResponseBody);
    app.use(express.logger(':method :url :status :response-time ms'));
    app.locals.pretty = true;
}

routes(app);
app.listen(port, function()
{
    console.log('Express server listening on port ' + port);
});
