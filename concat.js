//bufferOne MUST be a buffer
//bufferTwo can be a string or buffer
function concat(bufferOne, bufferTwo, limitFromEnd) {
    if (!Buffer.isBuffer(bufferOne)) throw new TypeError('First buffer passed to concat MUST be a buffer');
    var bufOneLen = bufferOne.length,
        bufTwoLen = bufferTwo.length,
        length = bufOneLen + bufTwoLen,
        start = 0,
        pos = 0;
    if (limitFromEnd > 0 && length > limitFromEnd) {
        start = length - limitFromEnd;
        length = limitFromEnd;
    }
    var buffer = new Buffer(length);
    if (start < bufOneLen) {
        bufferOne.copy(buffer, pos, start, bufOneLen);
        pos += bufOneLen - start;
        start = 0;
    } else {
        start -= bufOneLen;
    }
    if (typeof bufferTwo === 'string') {
        if (start > 0) {
            buffer.write(bufferTwo.substr(start), pos, bufTwoLen - start);
        } else {
            buffer.write(bufferTwo, pos, bufTwoLen - start);
        }
    } else {
        bufferTwo.copy(buffer, pos, start, bufTwoLen);
    }
    return buffer;
}

module.exports = concat;
