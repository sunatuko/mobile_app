"use strict";


const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間
let soundEndflag = "0"; // sound control
let data_key = "timeguess"; // localStorage key

// ボタンを"初期"状態とする
setButtonStateInitial()

////////////////////////
// ページ本体が読み込まれたタイミングで実行するコード
////////////////////////
window.addEventListener("DOMContentLoaded",
  function() {
    let w_rank = 7;
    let w_name = "fukada";
    let w_time = "10:00:10";
    let w_diff = "00:00:10"
    let obj = {
      name : w_name,
      time : w_time,
      diff : w_diff
    };
    let jsonObj = JSON.stringify(obj);
    localStorage.setItem(data_key + w_rank, jsonObj);
    w_rank = 2;
    w_name = "kawakami";
    w_time = "9:58:10";
    w_diff = "00:01:50";
    obj = {
      name : w_name,
      time : w_time,
      diff : w_diff
    };
    jsonObj = JSON.stringify(obj);
    localStorage.setItem(data_key + w_rank, jsonObj);

    viewStorage();      // localStorageからのスコアデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
  }, false
);

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click",
  function() {
    // sound countrol
    if(soundEndflag === "1") {
      soundControl("end",""); 
    }
    soundControl("start", "sound/start.mp3"); //サウンド
    soundEndflag = "1";
    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  },false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click",
  function() {
    // タイマーを"停止中"状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime;
    // sound countrol
    if(soundEndflag === "1") {
      soundControl("end",""); 
    }
    if(timer.textContent.substring(0, 5) === "00:10"){
      soundControl("start","sound/stop2.mp3"); //サウンド
      // backgroundの設定
      const fireworks = document.getElementsByTagName("body");
      fireworks[0].style.backgroundImage = "url('img/fireworks.gif')"; // 花火
      fireworks[0].style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    else {
      soundControl("start","sound/stop1.mp3"); //サウンド
    }
    soundEndflag = "1";

  },false
);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click",
  function() {
    // sound countrol
    if(soundEndflag === "1") {
      soundControl("end",""); 
    }
    soundControl("start","sound/reset.mp3"); //サウンド
    soundEndflag = "1";
    // ボタンを"初期"状態とする
    setButtonStateInitial()
    timer.textContent = "00:00.000";
    stopTime = 0;
    // backgroundを元に戻す
    const fireworks = document.getElementsByTagName("body");
    fireworks[0].style.backgroundImage = "";
    fireworks[0].style.backgroundColor = "rgba(233, 168, 227, 0.6)";
  }
);


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  start.classList.add("js-inactive");   // 非活性
  stop.classList.remove("js-inactive");  // 活性
  reset.classList.add("js-inactive");   // 非活性
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add(".timer_appear"); //時間をゆっくり表示
  start.classList.add("js-inactive"); // 活性
  stop.classList.add("js-inactive");    // 非活性
  reset.classList.remove("js-inactive"); // 活性
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}

// sound control
let w_sound
let music
function soundControl(status, w_sound){
  if(status === "start") {
      music = new Audio(w_sound);
      music.currentTime = 0;
      music.play();
  } else if(status === "end") {
      music.pause();
      music.currentTime = 0;
  }
}

// localStorageからのスコアデータの取得とテーブルへ表示
function viewStorage() {

  const list = document.getElementById("list");
  // htmlのテーブル初期化（しょきか）
  while(list.rows[0]) list.deleteRow(0);

  // localStorageすべての情報（じょうほう）の取得（しゅとく）
  for (let i=0; i < localStorage.length; i++) {
      let w_key = localStorage.key(i);

      if (w_key.substring(0,9) === data_key){ // keyの0~9が"timeguess"ならこのgameのスコアデータ
        let jsonObj = JSON.parse(localStorage.getItem(w_key));

        // localStorageのキーと値（あたい）を表示（ひょうじ）
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        
        td1.innerHTML = w_key.substring(9,);
        td2.innerHTML = jsonObj.name;
        td3.innerHTML = jsonObj.time;
        td4.innerHTML = jsonObj.diff;
      }

  }

  // jQueryのplugin tablesorterを使ってテーブルのソート
  // sortList: 引数１...最初からソートしておく列を指定、引数２...0…昇順,1…降順
  $("#tablescore").tablesorter({
    sortList: [[3, 0]]
  });

  $("#tablescore").trigger("update");

  // 10位以下は削除
  // while(list.rows[9]) {

  // };


};

