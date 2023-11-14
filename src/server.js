const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const User = require('./models/users.model');

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


app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
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

const port = 8080;
app.listen(port, (req, res) => {
    console.log(`Listening On ${port}`);
})

