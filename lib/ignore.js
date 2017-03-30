'use strict';

const minimatch = require('minimatch');

function match(path, patternList) {
    patternList = patternList || [];
    if (!Array.isArray(patternList)) {
        patternList = [patternList];
    }

    return patternList.some(function (pattern) {
        return minimatch(path, pattern);
    });
};

module.exports = match;
