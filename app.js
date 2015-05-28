var koa = require('koa');
var views = require('co-views');
var route = require('koa-route');
var serve = require('koa-static');
var favicon = require('koa-favicon');

var app = module.exports = koa();

var render = views(__dirname + '/jade', { ext: 'jade' });

app.use(route.get('/', indexRoute));

// static server
app.use(serve(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

function *indexRoute() {
    this.body = yield render('home');
};

app.listen(8001);
