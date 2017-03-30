'use strict';

const fs = require('fs');
const path = require('path');

const ignore = require('./ignore.js');

/**
 *
 * @param {String} _path
 * @param {String|Array} ignorePattenList
 */
function readDirectory(_path, ignorePattenList) {
    let result = {
        path: _path,
        name: path.basename(_path),
        type: 'directory'
    };
    let stack = [result];
    while(stack.length > 0) {
        let target = stack.pop();
        let files = fs.readdirSync(target.path);
        target.children = [];
        files.forEach(function (file) {
            if (!ignore(file, ignorePattenList)) {
                let filePath = path.resolve(target.path, file);
                let fileStat = fs.statSync(filePath);
                let model = {
                    path: filePath,
                    name: file,
                    type: fileStat.isDirectory() ? 'directory' : 'file'
                };
                target.children.push(model);
                if (model.type === 'directory') {
                    stack.push(model);
                }
            }
        });
    }
    return result;
}

module.exports = readDirectory;

// let targetPath = '/Users/fei/code/';
// let tree = readDirectory(targetPath, ['.*', 'node_modules']);
// console.log(JSON.stringify(tree, undefined, 4));
