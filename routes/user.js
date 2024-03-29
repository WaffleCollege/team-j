const express = require("express");
const router = express.Router()

//user.jsは、
//ルーティング（このページにたどり着くにはURLの最後がこうなるべき）を設定するときに、すべて最後が「/user/○○」となるから、「/user/」の部分をまとめて管理するためのファイルです。


router.get('/', (req, res) => {
  res.send("ユーザーです");
});

router.get('/info', (req, res) => {
  res.send("ユーザー情報です");
});

router.get('/:id', (req, res) => {
  res.send('${req.params.id}のユーザー情報を取得しました');
});
//":"とすることで、ランダムな数字を返す

module.exports = router;
//routerをどこでも使えるようにする