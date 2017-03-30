'use strict';

const loopSync = require('./lib/loop_sync.js');
const recursionSync = require('./lib/recursion_sync.js');
const recursion = require('./lib/recursion_async.js');

module.exports = {
    loopSync: loopSync,
    recursionSync: recursionSync,
    recursion: recursion
};
