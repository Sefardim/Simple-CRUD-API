'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var http = require('http');
var server = http.createServer(function (req, res) {
    res.end('Hello World');
});
server.listen(3000, function () {
    return console.log('Port is running on 3000');
});
