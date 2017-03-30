'use strict';

const fs = require('fs');
const path = require('path');

const ignore = require('./ignore.js');

function readDirectory(_path, ignorePattenList) {
    let result = {
        path: _path,
        name: path.basename(_path),
        type: 'directory'
    };

    let files = fs.readdirSync(_path);
    result.children = [];
    files.forEach(function (file) {
        if (!ignore(file, ignorePattenList)) {
            let filePath = path.resolve(_path, file);
            let fileStat = fs.statSync(filePath);
            if (fileStat.isDirectory()) {
                result.children.push(readDirectory(filePath, ignorePattenList));
            } else {
                result.children.push({
                    path: filePath,
                    name: file,
                    type: 'file'
                });
            }
        }
    });
    return result;
}

module.exports = readDirectory;

// let targetPath = '/Users/fei/code/';
// let tree = readDirectory(targetPath, ['.*', 'node_modules']);
// console.log(JSON.stringify(tree, undefined, 4));
