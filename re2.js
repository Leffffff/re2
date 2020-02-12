'use strict';

if (process.platform === 'win32') {
  var RE2 = require('./re2win.node');
} else if (process.platform === 'darwin') {
  var RE2 = require('./re2mac.node');
} else {
  var RE2 = require('./re2lin.node');
}

if (typeof Symbol != 'undefined') {
  Symbol.match &&
    (RE2.prototype[Symbol.match] = function (str) {
      return this.match(str);
    });
  Symbol.search &&
    (RE2.prototype[Symbol.search] = function (str) {
      return this.search(str);
    });
  Symbol.replace &&
    (RE2.prototype[Symbol.replace] = function (str, repl) {
      return this.replace(str, repl);
    });
  Symbol.split &&
    (RE2.prototype[Symbol.split] = function (str, limit) {
      return this.split(str, limit);
    });
}

module.exports = RE2;
