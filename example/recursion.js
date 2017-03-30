'use strict';

const recursion = require('../index.js').recursion;

let targetPath = '/Users/fei/code/';

// base usage
recursion(targetPath, function (error, tree) {
    if (error) {
        return console.error(error);
    }
    console.log(JSON.stringify(tree, undefined, 4));
});

// ignore file
recursion(targetPath, 'node_modules', function (error, tree) {
    if (error) {
        return console.error(error);
    }
    console.log(JSON.stringify(tree, undefined, 4));
});

recursion(targetPath, ['.*', 'node_modules'], function (error, tree) {
    if (error) {
        return console.error(error);
    }
    console.log(JSON.stringify(tree, undefined, 4));
});
