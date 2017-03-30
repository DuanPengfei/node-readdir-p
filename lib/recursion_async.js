'use strict';

const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const async = require('async');

const ignore = require('./ignore');

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

    async.waterfall([
        function (callback) {
            fs.readdir(_path, function (error, files) {
                if (error) {
                    return callback(error);
                }

                return callback(undefined, files);
            });
        },
        function (files, callback) {
            _.remove(files, function (file) {
                return ignore(file, ignorePattenList);
            });

            let length = files.length;
            if (length <= 0) {
                return callback(undefined, result);
            }

            result.children = [];
            async.parallel(files.map(function (file) {
                return function (callback) {
                    let filePath = path.resolve(_path, file);
                    fs.stat(filePath, function (error, fileStat) {
                        if (error) {
                            return callback(error);
                        }

                        if (fileStat.isDirectory()) {
                            readDirectory(filePath, ignorePattenList, function (error, _result) {
                                return callback(error, _result);
                            });
                        } else {
                            return callback(undefined, {
                                path: filePath,
                                name: file,
                                type: 'file'
                            });
                        }
                    });
                }
            }), function (error, _result) {
                if (error) {
                    return callback(error);
                } else {
                    result.children = result.children.concat(_result);
                    return callback(undefined, result);
                }
            });
        }
    ], function (error, result) {
        return callback(error, result);
    });
}

module.exports = readDirectory;

// let targetPath = '/Users/fei/code/';
// readDirectory(targetPath, ['.*', 'node_modules'], function (error, tree) {
//     console.log(JSON.stringify(tree, undefined, 4));
// });
