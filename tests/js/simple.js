var SortedList = require('../../SortedList');

var list = new SortedList();
list.insert(13, 2, 9, 8, 0);
console.log(list.toArray());

var arr = ["foo", "bar", "hoge"];
var strList = new SortedList({
  compare: "string"
}, arr);

console.log(strList.toArray());

var list2= new SortedList({
  resume : true
}, [2,1,3,4,5]);

console.log("resume (no checking)", list2.toArray())
