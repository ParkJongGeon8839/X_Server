import express from "express";
import postRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";

const app = express();

// 미들웨어 순서는 맞아야함
app.use(express.json());

app.use("/post", postRouter); // 이 두개는 순서가 변경되어도 상관이 없음, 걸리지 않기 때문에
app.use("/auth", authRouter); // 이 두개는 순서가 변경되어도 상관이 없음, 걸리지 않기 때문에

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(9000);
