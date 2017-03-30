'use strict';

const fs = require('fs');
const path = require('path');

const _ = require('lodash');

const ignore = require('./ignore.js');

function readDirectory(_path, ignorePattenList, callback) {
    if (typeof ignorePattenList === 'function') {
        callback = ignorePattenList;
        ignorePattenList = [];
    }

    let result = {
        path: _path,
        name: path.basename(_path),
        type: 'directory'
    }; 

    fs.readdir(_path, function (error, files) {
        if (error) {
            return callback(error);
        }

        _.remove(files, function (file) {
            return ignore(file, ignorePattenList);
        });

        let length = files.length;
        if (length <= 0) {
            return callback(undefined, result);
        }

        result.children = [];

        files.forEach(function (file) {
            let filePath = path.resolve(_path, file);
            fs.stat(filePath, function (error, fileStat) {
                if (error) {
                    return callback(error);
                }

                if (fileStat.isDirectory()) {
                    readDirectory(filePath, ignorePattenList, function (error, _result) {
                        if (error) {
                            return callback(error);
                        }

                        result.children.push(_result);

                        length -= 1;
                        if (length <= 0) {
                            return callback(undefined, result);
                        }
                    });
                } else {
                    result.children.push({
                        path: filePath,
                        name: file,
                        type: 'file'
                    });

                    length -= 1;
                    if (length <= 0) {
                        return callback(undefined, result);
                    }
                }
            });
        });
    });
}

module.exports = readDirectory;

let targetPath = '/Users/fei/code/';
readDirectory(targetPath, ['.*', 'node_modules'], function (error, tree) {
    console.log(JSON.stringify(tree, undefined, 4));
});