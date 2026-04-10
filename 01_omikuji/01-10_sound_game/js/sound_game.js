"use strict";

const quizBtns = document.querySelectorAll(".quizBtn");
let currentAudio = null; // 再生中のオーディオを保持する変数

let textArray = ["１", "２", "３", "４", "５"];

// sound JS new Audio()コンストラクタ
//↓　↓　↓　↓　↓　↓　↓　↓　↓　↓　↓　↓
let soundOK = new Audio("./sound/ok.mp3")
let soundNG = new Audio("./sound/ng.mp3")
let soundReset = new Audio("./sound/reset.mp3")
//↑　↑　↑　↑　↑　↑　↑　↑　↑　↑　↑　↑

let n = Math.floor(Math.random() * quizBtns.length);

quizBtns.forEach(function (quizBtn, index) {
  quizBtn.addEventListener('click', (e) => {
    if (index === n) {
      soundControl(soundOK);
      elementChange(quizBtn, "当たり", "yellow", "red");

      // クリック位置を画面全体に対する割合(0〜1)で計算
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // 指定位置から紙吹雪を発生させる
      confetti({
        particleCount: 100, // 紙吹雪の量
        spread: 70,         // 広がり具合
        origin: { x: x, y: y } // クリック位置
      });

    } else {
      soundControl(soundNG);
      elementChange(quizBtn, "はずれ", "whitesmoke", "blue");
    };

    quizBtn.classList.add("js-unclickable");
  });
});

const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", () => {
  soundControl(soundReset);

  quizBtns.forEach(function (quizBtn, index) {
    quizBtn.innerHTML = textArray[index];
    quizBtn.style.color = "whitesmoke";
    quizBtn.style.background = "plum";
    quizBtn.classList.remove("js-unclickable");
  });

  n = Math.floor(Math.random() * quizBtns.length);
})

function soundControl(w_sound) {
  // もし前の音が再生中なら止める
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  // 再生
  w_sound.play();
  // 再生中のオーディオを保持
  currentAudio = w_sound;
}

function elementChange(w_element, w_text, w_color, w_backColor) {
  // テキスト、文字色、背景色変更
  w_element.innerHTML = w_text;
  w_element.style.color = w_color;
  w_element.style.background = w_backColor;
}
