import express from "express";
import * as postController from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

// router 객체 만들기
const router = express.Router();

const validatePost = [
  // 처음에 앞뒤 공백 제거 후 최소 4자 이상인지 확인 아니라면 메세지로 알려줌
  body("text").trim().isLength({ min: 4 }).withMessage("최소 4자이상 입력!!"),
  validate,
];

// 전체 포스트 가져오기
// 특정 아이디의 대한 포스트 가져오기(어떤 아이디가 작성한 글만 가져오기), 1
// http://127.0.0.1:9000/post
// http:/127.0.0.1:9000/post?userid=XXX
router.get("/", postController.getPosts);

// 글번호에 대한 포스트 가져오기(특정 번호에 대한 글만 가져오기), 2 (1,2 이용해서 전체 보기)
// http://127.0.0.1:9000/post/:id
router.get("/:id", postController.getPost);

// 포스트 쓰기
// http://127.0.0.1:9000/post/
router.post("/", validatePost, postController.createPost);

// 포스트 수정하기
// http://127.0.0.1:9000/post/:id
router.put("/:id", validatePost, postController.updatePost);

// 포스트 삭제하기
// http://127.0.0.1:9000/post/:id
router.delete("/:id", postController.deletePost);
export default router;
