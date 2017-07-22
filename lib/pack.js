'use strict';

const os = require('os');
const path = require('path');
const shelljs = require('shelljs');

const getnpm = require('./get-npm');
const _ = require('./common/helper');

const tmpdir = os.tmpdir();

module.exports = (pkg, _npm) => {
  const npm = _npm || getnpm();
  const dir = path.join(tmpdir, `v${Math.random()}`);

  _.mkdir(dir);
  return new Promise((resolve, reject) => {
    _.spawn(npm, ['pack', pkg], {
      cwd: dir,
      stdio: 'ignore',
    }).then(() => {
      const files = shelljs.ls(dir);

      if (files && files[0]) {
        resolve(path.join(dir, files[0]));
      } else {
        reject('can not find the package file');
      }
    });
  });
};
