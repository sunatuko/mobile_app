"use strict";
let prev_value = null; //前回何のボタンを押したか退避
let w_result = ""; //計算用ワーク 計算ログ
let w_total = ""; //計算用ワーク 仮トータル
let currentAudio = null; // 再生中のオーディオを保持する変数
let click_sound = new Audio("./sound/click.mp3");

const calcLog = document.getElementById("calcLog");
const result = document.getElementById("result");
const buttons = document.getElementById("buttons");

// 親要素（id="buttons"）にイベントリスナーを1つだけ設定（イベントデリゲート）
buttons.addEventListener("click", (event) => {
  // クリックされたのがボタンでない場合は何もしない
  if (event.target.tagName !== "BUTTON") return;

  // 再生
  soundControl(click_sound);

  const btn_value = event.target.value;
  console.log(`prev_value: ${prev_value} w_result: ${w_result} w_total: ${w_total} calcLog: ${calcLog.textContent} result: ${result.textContent}`); // ★ログ出力
  if (btn_value === "C") {
    calcLog.textContent = "";
    result.textContent = "";
    w_result = "";
    w_total = "";
  } else if (btn_value === "=") {
    calcLog.textContent = w_result;
    try {
      // 文字列を計算ログに退避
      calcLog.textContent = w_result;
      // 文字列を計算して表示
      w_total = eval(w_result)
      result.textContent = w_total.toLocaleString('ja-JP'); //桁区切り
    } catch {
      result.textContent = "Error";
    }
  } else {
    // 前回はイコールを押していた場合
    if (prev_value === "=") {
      calcLog.textContent = w_total;
      w_result = w_total;
    }
    // 数字や演算子を表示に追加
    w_result += btn_value
    result.textContent = w_result.toLocaleString('ja-JP')
    calcLog.textContent += btn_value;

  }

  //前回何のボタンを押したか退避
  prev_value = btn_value;
  console.log(`prev_value: ${prev_value} w_result: ${w_result} w_total: ${w_total} calcLog: ${calcLog.textContent} result: ${result.textContent}`); // ★ログ出力
});

function soundControl(w_sound) {
  // もし前の音が再生中なら止める
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  // 再生
  w_sound.play().catch(error => {
    // JavaScriptの .play() は非同期処理（Promise）です。前の再生が終わっていない状態で、Enterキーの連打などで再度 .play() が呼ばれると、ブラウザが「前のリクエストを中断（Abort）」してエラーを投げます。
    if (error.name !== 'AbortError') {
      console.error("再生エラー:", error);
    }
  });
  // 再生中のオーディオを保持
  currentAudio = w_sound;
}