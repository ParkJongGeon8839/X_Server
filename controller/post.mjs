import { response } from "express";
import * as postRepository from "../data/post.mjs";

// 모든 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
  const userid = req.query.userid; // URL 쿼리에서 userid 가져오기 (?userid=값)
  const data = await // userid가 존재하면 -> 해당 사용자의 게시글만 조회
  // userid가 없으면 -> 전체 게시글 조회
  (userid ? postRepository.getAllByUserid(userid) : postRepository.getAll());
  res.status(200).json(data); // 조회된 데이터를 클라이언트에게 JSON으로 응답
}

// 하나의 포스트를 가져오는 함수
export async function getPost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다` });
  }
}

// 포스트를 작성하는 함수
export async function createPost(req, res, next) {
  const { userid, name, text } = req.body;
  const post = await postRepository.create(userid, name, text);
  res.status(201).json(post);
}

// 포스트를 변경하는 함수
export async function updatePost(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const post = await postRepository.update(id, text);
  if (post) {
    res.status(201).json(post);
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다` });
  }
}

// 포스트를 삭제하는 함수
export async function deletePost(req, res, next) {
  const id = req.params.id;
  await postRepository.remove(id);
  res.sendStatus(204);
}
