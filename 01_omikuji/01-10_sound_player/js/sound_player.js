"use strict";

// レコード盤のアニメーションのためだけのJavaScriptです。

const audio = document.getElementById("audio");
const player = document.getElementById("player");
const record = document.querySelector('.record');

// 再生されたらクラスを追加してアニメーション開始
audio.addEventListener("play", () => {
  player.classList.add("playing");
  record.classList.add("js-running");
})

// 停止されたらクラスを削除してアニメーション停止
audio.addEventListener("pause", () => {
  player.classList.remove("playing");
  record.classList.remove("js-running");
})