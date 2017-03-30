'use strict';

const recursionSync = require('../index.js').recursionSync;

let targetPath = '/Users/fei/code/';
let tree = {};

// basic usage
tree = recursionSync(targetPath);
console.log(JSON.stringify(tree, undefined, 4));

// ignore file
tree = recursionSync(targetPath, 'node_modules');
console.log(JSON.stringify(tree, undefined, 4));

tree = recursionSync(targetPath, ['.*', 'node_modules']);
console.log(JSON.stringify(tree, undefined, 4));
