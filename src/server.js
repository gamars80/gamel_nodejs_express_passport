const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const User = require('./models/users.model');
const passport = require('passport');
const cookieSession = require('cookie-session');
const { checkAuthenticated, checkNotAuthenticated } = require('./middlewares/auth');
const cookieEncryptionKey = 'superCookieSecretKey';

app.use(cookieSession({
    name: 'cookie-session-name',
    keys: [cookieEncryptionKey]
}))

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
mongoose.connect(`mongodb+srv://gamars80:qwer@cluster0.aaa1s7u.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('mongodb connected');
    
}).catch((err) => {
    console.log(err);
})

app.get('/', checkAuthenticated, (req,res) => {
    res.render('index');
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
})

app.post('/logout', (req, res, next) => {
    //passport에서 제공하는 req.logOut 이용
    req.logOut(function(err) {
        if(err) return next(err);
    })

    res.redirect('/login');
})

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup');
})

app.post('/signup', async (req, res) => {
    //User 객체 생성
    const user = new User(req.body);
    
    try{
        // 몽고 db user 컬렉션에 user를 저장한다
        await user.save();
        return res.status(200).json({
            success: true,
        })
    } catch(error) {
        console.error(error);
    }
})

app.post('/login', (req, res, next) => {
    //passport에서 제공하는 authenticate 전략중 이메일,비밀번호 형식인 local 전략
    passport.authenticate("local", (err, user , info) => {
        //에러가 있으면 express 에러처리기로 next
        if(err) next(err); 

        //유저가 없으면 info로 넘어온 메세지를 전달
        if(!user) {
            return res.json({msg:info});
        }
        
        //passport에서 제공하는 login
        req.logIn(user , function(err){
            if(err) return next(err);

            res.redirect('/')
        })

    })(req, res, next) // 미들웨어 안에 또 passport미들웨어가 있기에 req,res,next를 passport 미들웨어가 사용할수 있도록
})

//passport의 authenticate google 전략 사용
app.get('/auth/google', passport.authenticate('google'));

//구글에서 로그인 성공시 처리하는 콜백 url 에 대한 처리
app.get('/auth/google/callback', passport.authenticate('google',{
    successReturnToOrRedirect: '/',
    failueRedirect: '/login'
}));

const port = 8080;
app.listen(port, (req, res) => {
    console.log(`Listening On ${port}`);
})

