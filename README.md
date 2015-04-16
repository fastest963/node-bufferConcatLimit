buffer-concat-limit
===============

Simple helper method for Node.js to concatinate 2 buffers with a tail limit.

```
var bufferConcatLimit = require("buffer-concat-limit");
```

### bufferConcatLimit(bufferOne, bufferTwo[, limit])
Concatinates `bufferOne` with `bufferTwo` and returns the resulting buffer.
If `limit` is greater than 0, the resulting buffer will be limited to the last
`limit` bytes after concatination.

Note: `bufferTwo` can also be a string.
