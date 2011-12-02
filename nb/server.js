/**
 * @fileoverview
 * @author уем╕ <zhangting@taobao.com>
 *
 */
var http = require("http");
var url = require('url');

exports.start = function(route) {
    http.createServer(
        function(request, response) {
             var pathname = url.parse(request.url).pathname;
            console.log("Request for " + pathname + " received.");
            route(pathname);
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("good work\n");
            response.write("good work\n");
            response.end();
        }).listen(8888);
    console.log("Server has started.");
};