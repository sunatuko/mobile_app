"use strict";

window.addEventListener(
  "DOMContentLoaded",
  function () {
    // ページ本体が読み込まれたタイミングで実行するコード
    this.setTimeout(function () {
      let popMessage = "いらっしゃい！　おみくじ引いてって！";
      this.window.alert(popMessage);
    }, "3000");
  },
  false,
);

const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
btn1.addEventListener(
  "click",
  function () {
    let n = Math.floor(Math.random() * 3);
    switch (n) {
      case 0:
        omikujiText.textContent = "Very Happy!!!";
        omikujiText.style.color = "red";
        omikujiText.style.fontSize = "38px";
        break;
      case 1:
        omikujiText.textContent = "Happy!!!";
        omikujiText.style.color = "yellow";
        omikujiText.style.fontSize = "30px";
        break;
      case 2:
        omikujiText.textContent = "UnHappy!!!";
        omikujiText.style.color = "black";
        omikujiText.style.fontSize = "20px";
        break;
    }
  },
  false,
);
