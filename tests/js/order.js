var SortedList = require('../../SortedList')

function insert_with_options(options){
  var arr = [1,2,3,6,5,4,0,7]
  var list = new SortedList(options, arr)
  console.log(list.toArray())
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
