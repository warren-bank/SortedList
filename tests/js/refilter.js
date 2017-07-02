var SortedList = require('../../SortedList')

var options, make_presorted_array, run_test

options = {
  resume: true,
  compare: function(elementA, elementB) {
    var c = elementA.value - elementB.value
    return (c > 0) ? 1 : (c == 0)  ? 0 : -1
  },
  filter: function(element) {
    var now = Date.now()
    return (element.expiry > now)
  }
}

make_presorted_array = function() {
  var arr = []
  for (var i=1; i<=10; i++) {
    arr.push({
      value: (i * 10),
      expiry: Date.now() + (i * 1000)
    })
  }
  return arr
}

run_test = function(pause_ms=0, test_name='test') {
  console.log('----------------------------------------')
  console.log(`starting ${test_name}`)
  return new Promise((resolve, reject) => {
    var list, counter, timer
    list = new SortedList(options, make_presorted_array())
    counter = 0
    timer = setInterval(
      function(){
        counter++
        let removed = list.refilter()
        let list_length = list.length
        console.log(`[${counter * pause_ms} ms]: length of list = ${list_length} (${removed.length ? ('removed elements: ' + removed.map(element => element.value).join(', ')) : 'no change'})`)
        if (list_length === 0) {
          console.log(`completed ${test_name}`)
          clearInterval(timer)
          resolve()
        }    
      },
      pause_ms
    )
  })
}

run_test(500, 'test #1: 0.5s')
.then(() => {
  return run_test(1500, 'test #2: 1.5s')
})
.then(() => {
  process.exit(0)
})
.catch((error) => {
  process.exit(1)
})
