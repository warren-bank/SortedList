var SortedList = require('../../SortedList')

function insert_with_options(options){
  var arr = [1,2,3,6,5,4,0,7]
  var list = new SortedList(options, arr)
  console.log(list.toArray())
}

function find_position_with_options(options) {
  var arr = [1,3,7,9,11,13]
  var list = new SortedList(options, arr)
  console.log()
  console.log(`in ordered list: ${list.toArray()}`)
  console.log(`  position of element  '0' is '${list.bsearch(0)}'`)
  console.log(`  position of element  '1' is '${list.bsearch(1)}'`)
  console.log(`  position of element  '2' is '${list.bsearch(2)}'`)
  console.log(`  position of element  '5' is '${list.bsearch(5)}'`)
  console.log(`  position of element '12' is '${list.bsearch(12)}'`)
  console.log(`  position of element '13' is '${list.bsearch(13)}'`)
  console.log(`  position of element '14' is '${list.bsearch(14)}'`)
}

insert_with_options({
  order: 'descending'
})

insert_with_options({
  order: 'descending',
  max: 5
})

insert_with_options({
  order: 'ascending'
})

insert_with_options({
  order: 'ascending',
  max: 5
})

find_position_with_options({
  order: 'ascending'
})

find_position_with_options({
  order: 'descending'
})
