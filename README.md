# readdir-p

### Description
Read all files in folder then return JSON tree.

### Usage
#### Loop Sync
```javascript
const loopSync = require('readdir-p').loopSync;

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
```

#### Recursion Sync
```javascript
const recursionSync = require('readdir-p').recursionSync;

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
```

#### Recursion
```javascript
const recursion = require('readdir-p').recursion;

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

```
