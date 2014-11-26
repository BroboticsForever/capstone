'use strict';

var fs = require('fs'),
    config = require('meanio').loadConfig(),
    mkdirOrig = fs.mkdir,
    directory = config.root + '/files/public',
    osSep = '/',
    imageMagick = require('gm').subClass({ imageMagick: true});


function rename(file, dest, user, callback) {
   var fullName = directory + dest + file.name;

    fs.rename(file.path, fullName, function(err) {
        if (err) throw err;
        else
            imageMagick(fullName)
                .size(function (err, size) {
                    if (!err) {
                        var newWidth, newHeight;

                        if (size.width > 1000) {
                            newWidth = 1000;
                            newHeight = parseInt((newWidth / size.width) * size.height);
                        } else if (size.height > 700) {
                            newHeight = 700;
                            newWidth = parseInt((newHeight / size.height) * size.width);
                        }

                        if (newWidth !== size.width || newHeight !== size.height) {
                            imageMagick(fullName)
                                .resize(newWidth, newHeight)
                                .noProfile()
                                .write(fullName, function (err) {
                                    if (!err)
                                        console.log('Image resized successfully.');
                                    else
                                        console.log("\nThere was an error resizing the image:" + err);
                                });
                        }
                    } else {
                        console.log("\nThe size of the image could not be obtained: " + err);
                    }
                });

            callback({
                success: true,
                file: {
                    src: '/files/public' + dest + file.name,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    created: Date.now(),
                    createor: (user) ? {
                        id: user.id,
                        name: user.name
                    } : {}
                }
            });
    });
}

function mkdir_p(path, callback, position) {
    var parts = require('path').normalize(path).split(osSep);

    position = position || 0;

    if (position >= parts.length) {
        return callback();
    }

    var directory = parts.slice(0, position + 1).join(osSep) || osSep;
    fs.stat(directory, function(err) {
        if (err === null) {
            mkdir_p(path, callback, position + 1);
        } else {
            mkdirOrig(directory, function(err) {
                if (err && err.code !== 'EEXIST') {
                    return callback(err);
                } else {
                    mkdir_p(path, callback, position + 1);
                }
            });
        }
    });
}

exports.upload = function(req, res) {
    var path = directory + req.body.dest;

    if (!fs.existsSync(path)) {
        mkdir_p(path, function(err) {
            rename(req.files.file, req.body.dest, req.user, function(data) {
                res.jsonp(data);
            });
        });
    } else {
        rename(req.files.file, req.body.dest, req.user, function(data) {
            res.jsonp(data);
        });
    }
};