var bufferConcatLimit = require('../concat.js');

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
