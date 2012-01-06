/*
 * ���㱣���ʱ��lesstocss�����less�ļ��Զ������css�ļ�
 * �÷��� node less.js
 * version: v0.1 by �ɳ�(veryued.org)
 * modify by zhangting �޸�Ϊ��������less�ļ�
 **/

var fs = require('fs'),
    walk = require('walk'),
    exec = require('child_process').exec,
    path = require('path');

//����lessc·��
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
