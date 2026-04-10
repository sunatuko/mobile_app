"use strict";

// flagが"pen-flag"のときpenguinsのターン、"bear-flag"のときbearのターン
let flag = "pen-flag";

// ターン数カウンター
let counter = 9;

// squaresの要素（ようそ）を取得（しゅとく）
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// NewGameボタン取得（しゅとく）

// WinningLine pattern

// メッセージ
const msgtxt1 = '<p class="image">\
<img src ="img/penguins.jpg" width=61px height=61px>\
</p>\
<p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image">\
<img src ="img/whitebear.jpg" width=61px height=61px>\
</p>\
<p class="text">WhiteBear Attack!</p>';

// **********************************************
// ページ本体が読み込まれたタイミングで実行するコード
// **********************************************
window.addEventListener("DOMContentLoaded",
  function () {
    // メッセージ（最初はpenguinsのターンから）
    setMessage("pen-turn");
  }, false
);

// **********************************************
// squareをクリックしたときにイベント発火
// **********************************************
a_1.addEventListener("click",
  function () {
    isSelect(a_1);
  }, false
);
// 上記のコードを省略して記述したパターン
a_2.addEventListener("click", () => {
  isSelect(a_2);
});

a_3.addEventListener("click", () => {
  isSelect(a_3);
});

b_1.addEventListener("click", () => {
  isSelect(b_1);
});

b_2.addEventListener("click", () => {
  isSelect(b_2);
});

b_3.addEventListener("click", () => {
  isSelect(b_3);
});

c_1.addEventListener("click", () => {
  isSelect(c_1);
});

c_2.addEventListener("click", () => {
  isSelect(c_2);
});

c_3.addEventListener("click", () => {
  isSelect(c_3);
});

// **********************************************
// squareをクリックした時の処理
// **********************************************
function isSelect(selectSquare) {

  // ペンギンの時
  if (flag === "pen-flag") {
    // squareにはpenguinsを表示。squareをクリックできないようにする。
    selectSquare.classList.add("js-pen-checked", "js-unclickable");
    // メッセージ表示
    setMessage("bear-turn");
    flag = "bear-flag";

    // クマの時
  } else {
    // squareにはbearを表示。squareをクリックできないようにする。
    selectSquare.classList.add("js-bear-checked", "js-unclickable");
    // メッセージ表示
    setMessage("pen-turn");
    flag = "pen-flag";
  }

  // ターン数カウンターを－１する
  counter--;

  // ターン数＝０になったら引き分け(draw)
  if (counter === 0) {
    // メッセージ表示
    setMessage("draw");
  }

}
// **********************************************
// 勝敗判定(Win or Lose)
// **********************************************


// **********************************************
// メッセージ表示
// **********************************************
function setMessage(id) {
  switch (id) {
    case "pen-turn":
      document.getElementById("msgtext").innerHTML = msgtxt1;
      break;
    case "bear-turn":
      document.getElementById("msgtext").innerHTML = msgtxt2;
      break;
    default:
      document.getElementById("msgtext").innerHTML = msgtxt1;
  }
}

// **********************************************
// ゲーム終了時の処理
// **********************************************

// **********************************************
// NewGameボタン　クリック時、ゲーム初期化
// **********************************************

