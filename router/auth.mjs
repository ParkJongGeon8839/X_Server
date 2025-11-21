import express from "express";
import * as authController from "../controller/auth.mjs";

// router 객체 만들기
const router = express.Router();

// 회원가입
// http://127.0.0.1:9000/auth/signup
router.post("/signup", authController.signup);

// 로그인
router.post("/login", authController.login);

// 로그인 유지

// router 객체를 다른곳에 사용할수 있도록
export default router;
