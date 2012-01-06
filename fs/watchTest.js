/**
 * @fileoverview
 * @author уем╕ <zhangting@taobao.com>
 *
 */
var fs = require('fs');
var path = require('path');

console.log(path.resolve('./fs/test.less'));

//test directory watch
fs.watch('./fs/test.less', function(event, fileName) {
    if(event === 'change') {
        console.log('event=%s, fileName=%s', event, fileName);
    }
});