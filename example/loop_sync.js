'use strict';

const loopSync = require('../index.js').loopSync;

let targetPath = '/Users/fei/code/';
let tree = {};

// basic usage
tree = loopSync(targetPath);
console.log(JSON.stringify(tree, undefined, 4));

// ignore file
tree = loopSync(targetPath, 'node_modules');
console.log(JSON.stringify(tree, undefined, 4));

tree = loopSync(targetPath, ['.*', 'node_modules']);
console.log(JSON.stringify(tree, undefined, 4));
