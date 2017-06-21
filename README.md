## [SortedList](https://github.com/warren-bank/node-sortedlist)

CommonJS module: sorted list that uses a binary search algorithm for search and insertion

### Install

`npm install --save @warren-bank/node-sortedlist`

### Usage

```javascript
    // sort number
    var list = SortedList.create();
    list.insert(13, 2, 9, 8, 0);
    console.log(list.toArray()); // [0,2,8,9,13]

    // sort string
    var arr = ["foo", "bar", "hoge"];
    var strList = SortedList.create(arr, {
      compare: "string"
    });
    console.log(strList.toArray()); // ["bar", "foo", "hoge"]

    // SortedList is not Array
    console.assert(!Array.isArray(list));

    // SortedList is instanceof Array
    console.assert(list instanceof Array);

    // SortedList extends Array
    console.assert(list[2], 8);
    console.assert(list.length, 5);
    console.assert(list.pop(), 13);

    // register an already filtered array
    var list = SortedList.create([0,1,2,3,4], { resume: true });
```

### API Documentation

* SortedList.create(options, arr)
* sortedList.insertOne(val)
* sortedList.insert(val1, val2, ...)
* sortedList.remove(pos)
* sortedList.unique(createNew)
* sortedList.bsearch(val)
* sortedList.key(val)
* sortedList.keys(val)
* sortedList.toArray()

#### SortedList.create(options, arr)

create an instance of SortedList.

**options** is option object as follows.
<table>
<tr><th>key</th>
<td>type</td>
<td>description</td>
<td>example</td>
<td>default</td></tr>

<tr><th>unique</th>
<td>boolean</td>
<td>`true` indicates that duplicate values should be filtered, which will prevent their insertion.</td>
<td>true</td>
<td>false</td>
</tr>

<tr><th>filter</th>
<td>function</td>
<td>
Register a filtration function which is called before the insertion of each new value.
Return value is boolean.
`true` indicates that the value passes the filter and is permitted to be inserted.
`false` indicates that the value has failed the filter and cannot be inserted.
</td>
<td>function (v) { return !isNaN(Number(v) }</td>
<td>function (v) { return true }</td>
</tr>

<tr><th>compare</th>
<td>function</td>
<td>
Custom comparison function which returns one of [1, 0, -1].
The same spec as <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort">Array.sort(fn)</a>.
</td>
<td>function(a,b) { return a.start - b.start }</td>
<td></td>
</tr>

<tr><th>compare</th>
<td>string: one of "string", "number"</td>
<td>
Use a standard implementation for commonly used comparison functions:
  <ul>
    <li>"string" values</li>
    <li>"number" values</li>
  </ul>
</td>
<td>"string"</td>
<td>"number"</td>
</tr>

<tr><th>resume</th>
<td>boolean</td>
<td>
`true` indicates that the newly created instance of SortedList should be initialized with <b>all</b> the contents of `arr`,
and in the <b>exact same</b> order as given.
`false` indicates that the initial value contains the elements of `arr`,
but "filter" has been applied to each element and the insertion order is determined by "compare".
</td>
<td>true</td>
<td>false</td>
</tr>

<tr><th>order</th>
<td>string: one of "ascending", "descending"</td>
<td>
Determines the order in which elements of the list are sorted.
"ascending" indicates that smaller values occur toward the beginning.
"descending" indicates that larger values occur toward the beginning.<br>
note:
Do NOT adjust the "compare" function to achieve "descending" sort order.
This will be handled automatically.
</td>
<td>"descending"</td>
<td>"ascending"</td>
</tr>

<tr><th>max</th>
<td>number</td>
<td>
Restricts the maximum length of the list.
Truncates from the end of the list.
If list is sorted in 'ascending' order, then larger values are lost.
If list is sorted in 'descending' order, then smaller values are lost.
</td>
<td>100</td>
<td></td>
</tr>
</table>

**arr** is a initial value. All elements are shallowly copied.

Returns an instance of SortedList.

#### sortedList.insertOne(val)

Inserts **val** to the list.

Returns inserted position if succeeded, false if failed.

#### sortedList.insert(val1, val2, ...)

Inserts **val1** **val2**, ... to the list.

Returns list of the result of executing insertOne(val).

```javascript
    console.log(SortedList.create().insert(3,1,2,4,5));
    // [0,0,1,3,4]
```

#### sortedList.remove(pos)

Removes a value in the position **pos**.

Returns this.

#### sortedList.unique(createNew)

Make the list unique.
If **createNew** is true, returns a new array.

Otherwise, duplicated elements are internally removed, and this method returns this.

#### sortedList.bsearch(val)

Executes binary search with the given **val**.
Returns the position before insertion.

```javascript
    var list = SortedList.create([1,2,4,6,10]);
    console.log(list.bsearch(4)); // 2
    console.log(list.bsearch(5)); // 2
    console.log(list.bsearch(0)); // -1
    console.log(list.bsearch(12)); // 4
```

#### sortedList.key(val)

If the given **val** exists, returns the first position.

Otherwise, returns null.

```javascript
    var list = SortedList.create([1,2,4,4,4,6,10]);
    console.log(list.key(10)); // 6
    console.log(list.key(4)); // 2
    console.log(list.key(5)); // null
    console.log(list.key(1)); // 0
```

#### sortedList.keys(val)

If the given **val** exists, returns an array of all the positions with **val**.

Otherwise, returns null.

```javascript
    var list = SortedList.create([1,2,4,4,4,6,10]);
    console.log(list.keys(10)); // [4]
    console.log(list.keys(4)); // [2, 3, 4]
    console.log(list.keys(5)); // null
    console.log(list.keys(1)); // [0]
```

#### sortedList.toArray()

Creates a new array with this list.

### SortedList extends Array

As SortedList extends Array, we can use every method in Array.

```javascript
    var list = SortedList.create([1,2,4,6,10]);

    console.log(list[2]) // 4

    list.forEach(function(total, v) {
      // ...
    });

    var newArr = list.map(function(total, v) {
      // ...
    });
```

Be careful of these differences.

```javascript
    Array.isArray(SortedList.create()) // false
    (SortedList.create()) instanceof Array // true
```
