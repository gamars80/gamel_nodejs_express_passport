function checkAuthenticated(req, res, next) {
    //passport 에서 제공해주는 isAuthenticated
    if(req.isAuthenticated()) {
        //인증이 되어 있으면 미들웨어를 빠져나가게
        return next();
    }

    //안되어 있으면 강제로 로그인 페이지로 리다이렉트
    return res.redirect('/login')
}


//checkAuthenticated 반대개념
//예를 들어 로그인 된 유저가 다시 로그인페이지나 회원가입으로 가려는 경우
function checkNotAuthenticated(req, res, next) {

    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    
    return next();
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
}