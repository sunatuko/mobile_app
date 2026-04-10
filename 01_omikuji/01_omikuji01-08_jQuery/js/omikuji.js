"use strict";

window.addEventListener(
  "DOMContentLoaded",
  function () {
    // ページ本体が読み込まれたタイミングで実行するコード
    // 01-08 add headerのテキスト１文字ずつランダム表示
    $("header").textillate({
      loop: false, // ループのオンオフ
      minDisplayTime: 9000, // テキストが置き換えられるまでの表示時間
      initialDelay: 1000, // 遅延時間
      autoStart: true, // アニメーションを自動的にスタート
      in: {
        // フェードインのエフェクトの詳細設定
        effect: "fadeInLeftBig", // エフェクトの名前（animate.css参照）
        delayScale: 1.5, // 遅延時間の指数
        delay: 50, // 文字ごとの遅延時間
        sync: false, // trueはアニメーションをすべての文字に同時に適用
        shuffle: true, // trueは文字を順番にではなく、ランダムに
      },
    });

    // 01-08 add omikuji.png(id="btn1")　ボヤァと表示
    $(function () {
      ScrollReveal().reveal("#btn1", { duration: 9000 });
    });

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
    // 01-08 add snowfall stop
    $(document).snowfall("clear");

    // 01-08 add snowfall start
    $(document).ready(function () {
      $(document).snowfall({
        maxSpeed: 10, // 最大速度
        minSpeed: 1, // 最小速度
        maxSize: 30, // 最大サイズ
        minSize: 10, // 最小サイズ
        image: "./img/sakura_hanabira.png",
      });
    });

  },
  false,
);
