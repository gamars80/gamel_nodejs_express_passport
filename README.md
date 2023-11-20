﻿# gamel_nodejs_express_passport
# 로그인, 회원가입 화면
  ejs 모듈을 이용한 로그인 회원가입 화면
# passport 를 이용한 회원가입 및 로그인 비즈니스 로직
  회원가입시 mongodb에 save

  passport의 serializeUser , deserializeUser 구현하여 cookie-session을 이용한 로그인 비즈니스 로직
  
  페이지 접근시 인증여부를 검증하는 미들웨어 auth.js 추가

  bcrypt를 통한 회원가입시 비밀번호 암호화 및 로그인시 compare 처리
# dotenv를 통한 프로필환경 분리 및 환경변수 설정
  dotenv 모듈 설치하여 default/dev/pord 환경 분리

  중요한 설정 값들 환경변수로 빼서 사용 proceess.env.환경변수

# 리팩토링
  Router 통한 소스 리팩토링

# 회원가입시 웰컴 메일 보내기
  nodemailer 를 통한 메일 전송

# 카카오 로그인 연동하기
  passport kakako-oauth 통한 카카오 로그인 연동하기

# product 모델 부터 CRUD
  mongoose를 이용한 모델 스키마 생성, 모델 생성, CRUD 구현
    
  
