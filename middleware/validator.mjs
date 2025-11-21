import { validationResult } from "express-validator";

// validate 저장 하는 변수
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg }); // errors.array()[0].msg ← "최소 4자이상 입력!!" 이 메세지가 들어가있음
};
