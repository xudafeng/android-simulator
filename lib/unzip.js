'use strict';

const fs = require('fs');
const tar = require('tar');
const zlib = require('zlib');

const createReadStream = fs.createReadStream;

module.exports = (filename, dir) => {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filename);
    const gunzip = zlib.createGunzip();
    gunzip.on('error', err => reject(err));
    const extracter = tar.x({
      path: dir,
      strip: 1,
    });
    extracter.on('error', err => reject(err));
    extracter.on('end', () => resolve());
    stream.pipe(gunzip).pipe(extracter);
  });
};
