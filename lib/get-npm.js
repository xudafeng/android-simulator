'use strict';

const shelljs = require('shelljs');

module.exports = list => {
  const array = list || ['npm'];

  let npm = 'npm';

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    if (shelljs.which(item)) {
      npm = item;
      break;
    }
  }

  if (process.platform === 'win32') {
    return `${npm}.cmd`;
  } else {
    return npm;
  }
};
