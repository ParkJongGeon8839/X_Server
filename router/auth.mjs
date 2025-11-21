import express from "express";
import * as authController from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

// router 객체 만들기
const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("아이디는 최소 4자이상 입력")
    .matches(/^[a-zA-Z09]+$/)
    .withMessage("특수문자 사용불가"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("비밀번호는 최소 4자 이상 입력"),
  validate,
];

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

// 회원가입
// http://127.0.0.1:9000/auth/signup
router.post("/signup", validateSignup, authController.signup);

// 로그인
router.post("/login", validateLogin, authController.login);

// 로그인 유지

// router 객체를 다른곳에 사용할수 있도록
export default router;
