"use strict";


const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間
let soundEndflag = "0"; // sound control

// ボタンを"初期"状態とする
setButtonStateInitial()

// fukada add-str
////////////////////////
// ページ本体が読み込まれたタイミングで実行するコード
////////////////////////
window.addEventListener("DOMContentLoaded",
  function() {
    viewScore();      // localStorageからのスコアデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
  }, false
);
// fukada add-end

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
    // fukada del-str
    // sound countrol
    // if(soundEndflag === "1") {
    //   soundControl("end",""); 
    // }
    // if(timer.textContent.substring(0, 5) === "00:10"){
    //   soundControl("start","sound/stop2.mp3"); //サウンド
    //   // backgroundの設定
    //   const fireworks = document.getElementsByTagName("body");
    //   fireworks[0].style.backgroundImage = "url('img/fireworks.gif')"; // 花火
    //   fireworks[0].style.backgroundColor = "rgba(0, 0, 0, 0)";
    // }
    // else {
    //   soundControl("start","sound/stop1.mp3"); //サウンド
    // }
    // soundEndflag = "1";
    // fukada del-end

    // fukada add-str
    let justTime = "00:10.000";
    let justTime_m = Number(justTime.substring(0,2));
    let justTime_s = Number(justTime.substring(3,5));
    let justTime_ms = Number(justTime.substring(6,9));

    let stopTime_m = Number(timer.textContent.substring(0,2));
    let stopTime_s = Number(timer.textContent.substring(3,5));
    let stopTime_ms = Number(timer.textContent.substring(6,9));

    let diff_m = 0;
    let diff_s = 0;
    let diff_ms = 0;

    if (timer.textContent >= justTime){ // 10秒以上のとき
      // microsecond
      diff_ms = stopTime_ms - justTime_ms;
      // second
      if (stopTime_s >= justTime_s){
        diff_s = stopTime_s - justTime_s;
      } else {
        stopTime_m -= 1;
        diff_s = 60 - justTime_s;
      }
      // minutes
      diff_m = stopTime_m - justTime_ms;
    } else { // 10秒未満のとき
      // microsecond
      if (justTime_ms > stopTime_ms){
        diff_ms = justTime_ms - stopTime_ms;
      } else {
        justTime_s -= 1;
        diff_ms = 1000 - stopTime_ms;
      }
      // second
      diff_s = justTime_s - stopTime_s;
      // minutes
      diff_m = 0;
    }

    let diff_time = String(diff_m).padStart(2, "0") + ":" + String(diff_s).padStart(2, "0") + "." + String(diff_ms).padStart(3, "0");
    console.log(diff_time);

    let top10_flg = "0";
    const tablescore = document.getElementById("tablescore");
    let w_tablescore_len = tablescore.rows.length;
    if (w_tablescore_len < 11) {
      top10_flg = "1";
      Swal.fire({
          title: "TOP10★Congratulations!!"
        , html : "名前を入力してください。"
        , input : "text"
        , inputPlaceholder: "input your name!"
      }).then(function(result) {
        if (result.value === "") {
          result.value = "no name";
        }
        // sweetAleartで名前を入力させる。入力なしの時はno nameとする。
        saveScore(result.value, diff_time);
        viewScore();
      });
    } else {
      for (let j=1; j < w_tablescore_len; j++) {
        if (tablescore.rows[j].cells[3].firstChild.data > diff_time){
          top10_flg = "1";
          Swal.fire({
              title: "TOP10★Congratulations!!"
            , html : "名前を入力してください。"
            , input : "text"
            , inputPlaceholder: "input your name!"
          }).then(function(result) {
            if (result.value === "") {
              result.value = "no name";
            }
            // sweetAleartで名前を入力させる。入力なしの時はno nameとする。
            saveScore(result.value, diff_time);
            viewScore();
          });
          break;
        }
    
      }
    }

    // sound countrol
    if(soundEndflag === "1") {
      soundControl("end",""); 
    }
    if (top10_flg === "1") {
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
    // fukada add-end

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

// fukada add-str
// localStorageからのスコアデータの取得とテーブルへ表示
function viewScore() {

  const list = document.getElementById("list");
  // htmlのテーブル初期化（しょきか）
  while(list.rows[0]) list.deleteRow(0);

  let array_rank = [];
  let array_name = [];
  let array_time = [];
  let array_diff = [];
  let exited_flg = "0";

  // localStorageすべての情報（じょうほう）の取得（しゅとく）
  for (let i=0; i < localStorage.length; i++) {
      let w_key = localStorage.key(i);

      if (w_key === "timeguess"){ // keyが"timeguess"ならこのgameのスコアデータ
        exited_flg = "1";
        let jsonObj = JSON.parse(localStorage.getItem(w_key));
        for (let i=0 ; i < Object.keys(jsonObj).length; i++) {
          array_rank[i] = jsonObj[i][0]
          array_name[i] = jsonObj[i][1]
          array_time[i] = jsonObj[i][2]
          array_diff[i] = jsonObj[i][3]
        }

        for (let j=0; j < array_rank.length; j++) {
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
          
          td1.innerHTML = array_rank[j];
          td2.innerHTML = array_name[j];
          td3.innerHTML = array_time[j];
          td4.innerHTML = array_diff[j];
        }

        break;
      }

  }

  if (exited_flg === "1") { 
    // jQueryのplugin tablesorterを使ってテーブルのソート
    // sortList: 引数１...最初からソートしておく列を指定、引数２...0…昇順,1…降順
    $("#tablescore").tablesorter({
      sortList: [[3, 0]]
    });
  
    $("#tablescore").trigger("update");
  
    // rank更新 & 11位以降は削除
    let array_index = 0;
    const tablescore = document.getElementById("tablescore");
    for (let j=1; j < tablescore.rows.length; j++) { // table 1行目は見出しなのでスキップ
      if (j <= 10){
        // rank更新
        tablescore.rows[j].cells[0].firstChild.data = j; // 画面上のrank update
        array_rank[array_index] = j;
        array_name[array_index] = tablescore.rows[j].cells[1].firstChild.data
        array_time[array_index] = tablescore.rows[j].cells[2].firstChild.data
        array_diff[array_index] = tablescore.rows[j].cells[3].firstChild.data
      } else {
        // 11位以降は削除
          while(tablescore.rows[11]) tablescore.deleteRow(11); // 見出し1行+明細10行で11行
          break;
      }
  
      array_index += 1;
    }

    // localStorageに再登録
    let obj = {};
    for (let i=0 ; i < array_rank.length; i++) {
        obj[i] = [array_rank[i], array_name[i], array_time[i], array_diff[i]];
    }
    console.log(obj);
    let jsonObj = JSON.stringify(obj);
    localStorage.setItem("timeguess", jsonObj);
  }

};
// fukada add-end

// fukada add-str
function saveScore(input_name, diff_time) {
  let exited_flg = "0";
  for (let i=0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    if (w_key === "timeguess"){ // keyが"timeguess"ならこのgameのスコアデータ
      exited_flg = "1";
      let jsonObj = JSON.parse(localStorage.getItem(w_key));
      let array_rank = [];
      let array_name = [];
      let array_time = [];
      let array_diff = [];
      
      for (let i=0 ; i < Object.keys(jsonObj).length; i++) {
        array_rank[i] = jsonObj[i][0]
        array_name[i] = jsonObj[i][1]
        array_time[i] = jsonObj[i][2]
        array_diff[i] = jsonObj[i][3]
      }

      let array_index = array_rank.length; // 暫定で一番後ろに追加する
      array_rank[array_index] = 0; // 暫定 vierScoreでrankは付けなおされる
      array_name[array_index] = input_name
      array_time[array_index] = timer.textContent
      array_diff[array_index] = diff_time
      
      // localStorageに再登録
      let obj = {};
      for (let i=0 ; i < array_rank.length; i++) {
          obj[i] = [array_rank[i], array_name[i], array_time[i], array_diff[i]];
      }
      console.log(obj);
      jsonObj = JSON.stringify(obj);
      localStorage.setItem("timeguess", jsonObj);

      break;
    }
  }

  // localStorageにkey="timeguess"がない場合
  if (exited_flg === "0") {
      // localStorageに登録
      let array_rank = [];
      let array_name = [];
      let array_time = [];
      let array_diff = [];
      array_rank[0] = 0; // 暫定 vierScoreでrankは付けなおされる
      array_name[0] = input_name
      array_time[0] = timer.textContent
      array_diff[0] = diff_time

      let obj = {};
      for (let i=0 ; i < array_rank.length; i++) {
          obj[i] = [array_rank[i], array_name[i], array_time[i], array_diff[i]];
      }
      console.log(obj);
      let jsonObj = JSON.stringify(obj);
      localStorage.setItem("timeguess", jsonObj);
  }

};
// fukada add-end