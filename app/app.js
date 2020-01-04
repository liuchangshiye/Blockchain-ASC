var createError = require('http-errors');
var express = require('express');
var path = require('path');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })


//var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let session = require('express-session'); 
//let accountRouter = require('./routes/account'); //样例理由
//let encrypt = require('./models/encrypt.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('models'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串    
	cookie: { maxAge: 20 * 60 * 1000 }, //cookie生存周期20*60秒    
	resave: true,  //cookie之间的请求规则,假设每次登陆，就算会话存在也重新保存一次    
	saveUninitialized: true //强制保存未初始化的会话到存储器    
}));  //这些是写在app.js里面的  
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use("*", function(req, res, next) {
  response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
