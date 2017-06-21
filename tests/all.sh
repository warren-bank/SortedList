#!/usr/bin/env bash

dir=`dirname $0`
dir=$dir'/js'

files=(`cd "$dir" && ls -l *.js|awk '{print $9}'`)
for jsfile in ${files[@]}
do
  echo "=====${jsfile}====="
  node $dir/${jsfile}
  echo ""
done
