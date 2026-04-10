
// ★Sampleコードをdeveloper tool Console に Copy&Paste して実行して結果を確認しましょう。

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// filter()メソッドは、既存の配列から指定された条件に該当する要素を持つ新しい配列を作成する。
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// 配列の中から奇数だけを取り出す
let array1 = [1, 4, 7, 12, 21];
let result1 = array1.filter(function(e) {
  return e % 2 === 1;
});
console.log(result1);

// 配列の中から5以上の数字を抽出する
let array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let result2 = array2.filter(function(e) {
  return e >= 5;
});
console.log(result2);

// 文字列の中から条件に合った文字列を抽出する
let array3 = ["item1", "item2", "item3"];
let result3 = array3.filter(function(value) {
  return value === "item2";
});
console.log(result3);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// someメソッドは、配列内のいずれかの要素が条件に合致する場合にtrueを返す。
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// 33は3で割り切れるため、以下の処理はtrueを返す。
let array4 = [10,20,33,40,50];
let result4 = array4.some(function(value1){
  return value1 % 3 ==0;
});
console.log(result4);

// 6で割り切れるものが、１つもないため、以下の処理はfalseを返す。
let array5 = [10,20,33,40,50];
let result5 = array5.some(function(value2){
    return value2 % 6 ==0;
});
console.log(result5);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// everyメソッドは、配列内のすべての要素に合致している場合にtrueを返す。
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// すべて2で割り切れるため、以下の処理はtrueを返す。 
let array6 = [10,20,30,40,50];
let result6 = array6.every(function(value3){
    return value3 % 2 ==0;
});
console.log(result6);

// 2で割り切れないものがあるため、以下の処理はfalseを返す。 
let array7 = [10,20,30,40,50,61];
let result7 = array7.every(function(val){
    return val % 2 ==0;
});
console.log(result7);