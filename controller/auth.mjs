import express from "express";
import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretkey = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()";
const bcryptSaltRounts = 10;
const jwtExpiresInDays = "2d";

async function createJwtToken(id) {
  return jwt.sign({ id }, secretkey, { expiresIn: jwtExpiresInDays });
}

// 회원가입
export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;

  // 회원 중복 체크
  const found = await authRepository.findByUserId(userid);
  if (found) {
    return res.status(409).json({ message: `${userid}이 이미 있습니다` });
  }
  const hashed = bcrypt.hashSync(password, bcryptSaltRounts);
  // const user = await authRepository.createUser(userid, password, name, email);
  // 기존거는 암호화가 아니기때문에 그래서 hashed 암호화로 저장함
  const user = await authRepository.createUser(userid, hashed, name, email);
  const token = await createJwtToken(user.id);
  console.log(token);
  res.status(201).json({ token, user });
}

// 로그인
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.findByUserId(userid);
  if (!user) {
    res.status(401).json(`${userid}를 찾을 수 없음`);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: `아이디 또는 비밀번호 확인!!!` });
  }

  const token = await createJwtToken(user.id);
  res.status(200).json({ token, user });
}

// const user = await authRepository.login(userid, password);
// if (user) {
//   res.status(200).json({ message: `${userid}님 로그인 완료!!` });
// } else {
//   res
//     .status(404)
//     .json({ message: `${userid}님 아이디 또는 비밀번호를 확인 하세요!!` });
// }

// 회원정보 수정

// 회원정보 삭제
