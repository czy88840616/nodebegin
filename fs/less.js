/*
 * 当你保存的时候，lesstocss将你的less文件自动编译成css文件
 * 用法： node less.js
 * version: v0.1 by 飞长(veryued.org)
 * modify by zhangting 修改为监听所有less文件
 **/

var fs = require('fs'),
    walk = require('walk'),
    exec = require('child_process').exec,
    path = require('path');

//设置lessc路径
var lessc = path.resolve('./node_modules/.bin/lessc.cmd');

var toCss = function(filename) {
    var baseName = path.resolve(path.dirname(filename), path.basename(filename, '.less'));

    exec('' + lessc + ' ' + filename + ' > ' + baseName + '.css', { encoding: ''},
        function (err, stdout, stderr) {
            if (err != null) {
                fs.writeFile(baseName + '.log', err, '', function(error) {
                    if(error) {
                        console.log('write file error:' + error);
                    }
                });
            } else {
                console.log(baseName + '.css has render.');
            }
        });
};

// Walker options
var walker  = walk.walk('.', { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    if(!/^.\/node_modules/.test(root) && /.less$/.test(stat.name)) {
        (function(filename){
            toCss(filename);
            fs.watch(filename ,function(event, name){
                if(event === 'change') {
                    toCss(filename);
                }
            });
        })(root + '/' + stat.name);
    }

    next();
});
