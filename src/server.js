const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const cookieSession = require('cookie-session');
const config = require('config');
const mainRouter = require('./routes/main.router');
const usersRouter = require('./routes/users.router');
const passport = require('passport');
const serverConfig = config.get('server');

require('dotenv').config();

app.use(cookieSession({
    name: 'cookie-session-name',
    keys: [process.env.COOKIE_ENCRYPTION_KEY]
}));

// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

//패스포트를 이용하기위한 미들웨어 등록
app.use(passport.initialize());
app.use(passport.session());

//분리한 passort.js 를 require한다
require('./config/passport');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//정적 파일 미들웨어 사용 설정
app.use('/static', express.static(path.join(__dirname, 'public')));

//view 엔진 ejs 셋팅
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//몽고 커넥션
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('mongodb connected');
    
}).catch((err) => {
    console.log(err);
});

app.use('/', mainRouter);
app.use('/auth', usersRouter);



const port = serverConfig.get('port');

app.listen(port, (req, res) => {
    console.log(`Listening On ${port}`);
})

