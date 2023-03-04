
const express = require('express');

const app = express();
const userRouter = require("./routes/user")

const PORT = 3000;

 app.use(express.static("public"));
//app.set("view engine" , "ejs" );

app.get('/', (req, res) => {
  // console.log("Hello");
  // res.send("<h1>こんにちわ</h1>")
  // res.sendStatus(500).send("エラーです")
  // res.status(500).json({msg:"エラーです"})
  res.render("index", { text: "NodejsとExpress"});
});

//ルーティング
app.use("/user", userRouter);

//ミドルウェア


app.listen(PORT, () => console.log("サーバーが起動しました"));