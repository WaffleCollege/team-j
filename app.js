
const express = require('express');

const app = express();
const userRouter = require("./routes/user")

const PORT = 3000;

 app.use(express.static("public"));
 //publicというフォルダのなかで作成
 
 app.use(express.static("public2"))

//app.set("view engine" , "ejs" );
//テンプレートエンジン：DBで用意したものを表示
//とりあえず何もしない

app.get('/', (req, res) => {
  // console.log("Hello");
  // res.send("<h1>こんにちわ</h1>")
  // res.sendStatus(500).send("エラーです")
  res.status(500).json({msg:"エラーです"})
  //res.render("index", { text: "NodejsとExpress"});
});

//ルーティング
//ここでユーザーに関して管理
app.use("/user", userRouter);
// /user以降は、userRouterに任せる

//ミドルウェア


app.listen(PORT, () => console.log("サーバーが起動しました"));