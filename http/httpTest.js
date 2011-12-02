/**
 * @fileoverview
 * @author уем╕ <zhangting@taobao.com>
 *
 */
var http = require('http');
http.createServer(
    function (req, res) {

        res.writeHead(200, {'Content-Type': 'text/plain'});

        var options = {
            host: 'www.taobao.com',
            port: 80,
            path: '/'
        };

        var serverResponse = res;

        http.get(options,
            function(res) {
                console.log("Got response: " + res.statusCode);
                res.on('data', function(data) {
//                    console.log(ponse);
                    serverResponse.write(data.toString('utf8', 0, data.length));
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });


    }).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
//var mod = require('module');
//console.info(mod);
