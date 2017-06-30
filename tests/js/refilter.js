var SortedList = require('../../SortedList')

var options, arr, list, counter, pause_ms, timer

options = {
  compare: function(elementA, elementB) {
    var c = elementA.value - elementB.value
    return (c > 0) ? 1 : (c == 0)  ? 0 : -1
  },
  filter: function(element) {
    var now = Date.now()
    return (element.expiry > now)
  }
}

arr = []
for (var i=1; i<=10; i++) {
  arr.push({
    value: (i * 10),
    expiry: Date.now() + (i * 1000)
  })
}

list = new SortedList(options, arr)

counter = 0
pause_ms = 250
timer = setInterval(
  function(){
    counter++
    list.refilter()

    let list_length = list.length
    console.log(`[${counter * pause_ms} ms]: length of list = ${list_length}`)
    if (list_length === 0) {
      console.log('test complete')
      clearInterval(timer)
    }    
  },
  pause_ms
)
