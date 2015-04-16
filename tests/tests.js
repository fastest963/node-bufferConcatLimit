var assert = require('assert'),
    bufferConcatLimit = require('../concat.js');

//Node 0.10.x doesn't have equals
if (typeof Buffer.prototype.equals !== 'function') {
    Buffer.prototype.equals = function(buf) {
        if (this.length != buf.length) {
            return false;
        }
        for (var i = 0; i < this.length; i++) {
            if (this[i] !== buf[i]) {
                return false;
            }
        }
        return true;
    };
}
(function() {
    var a = new Buffer(3),
        b = new Buffer(3);
    a.fill('a');
    b.fill('b');
    assert.equal(a.equals(b), false);
    b.fill('a');
    assert.equal(a.equals(b), true);
}())

exports.noLimit = function(test) {
    var bufOne = new Buffer(100),
        bufTwo = new Buffer(99),
        buf = bufferConcatLimit(bufOne, bufTwo);
    test.ok(Buffer.isBuffer(buf));
    test.equal(buf.length, 199);
    test.done();
};

exports.zeroLimit = function(test) {
    var bufOne = new Buffer(100),
        bufTwo = new Buffer(99),
        buf = bufferConcatLimit(bufOne, bufTwo, 0);
    test.ok(Buffer.isBuffer(buf));
    test.equal(buf.length, 199);
    test.done();
};

exports.limitOneHundred = function(test) {
    var bufOne = new Buffer(100),
        bufTwo = new Buffer(99),
        buf;
    bufOne.fill(61);
    bufTwo.fill(62);
    buf = bufferConcatLimit(bufOne, bufTwo, 100);
    test.ok(Buffer.isBuffer(buf));
    test.equal(buf.length, 100);
    test.equal(buf[0], 61);
    test.equal(buf[1], 62);
    test.done();
};

exports.limitOneHundredString = function(test) {
    var bufOne = new Buffer(100),
        bufTwo = new Buffer(99),
        buf;
    bufOne.fill(61);
    bufTwo.fill(62);
    buf = bufferConcatLimit(bufOne, bufTwo.toString(), 100);
    test.ok(Buffer.isBuffer(buf));
    test.equal(buf.length, 100);
    test.ok(buf.equals(Buffer.concat([bufOne.slice(99, 100), bufTwo])));
    test.equal(buf[0], 61);
    test.equal(buf[1], 62);
    test.done();
};

exports.limitLargerThanBoth = function(test) {
    var bufOne = new Buffer(10),
        bufTwo = new Buffer(2),
        buf;
    bufOne.fill(61);
    bufTwo.fill(62);
    buf = bufferConcatLimit(bufOne, bufTwo, 100);
    test.equal(buf.length, 12);
    test.ok(buf.equals(Buffer.concat([bufOne, bufTwo])));
    test.done();
};

exports.limitOne = function(test) {
    var bufOne = new Buffer(3),
        bufTwo = new Buffer(4),
        buf;
    bufOne.fill(61);
    bufTwo.fill(62);
    buf = bufferConcatLimit(bufOne, bufTwo, 1);
    test.equal(buf.length, 1);
    test.equal(buf[0], 62);
    test.done();
};
