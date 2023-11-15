# gamel_nodejs_express_passport
# 로그인, 회원가입 화면
  ejs 모듈을 이용한 로그인 회원가입 화면
# passport 를 이용한 회원가입 및 로그인 비즈니스 로직
  회원가입시 mongodb에 save

  passport의 serializeUser , deserializeUser 구현하여 cookie-session을 이용한 로그인 비즈니스 로직
  
  페이지 접근시 인증여부를 검증하는 미들웨어 auth.js 추가

  bcrypt를 통한 회원가입시 비밀번호 암호화 및 로그인시 compare 처리
    
  
