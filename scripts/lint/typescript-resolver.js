const resolve = require('resolve');
const path = require('path');

module.exports.interfaceVersion = 2;

module.exports.resolve = function (source, file, config) {
  if (resolve.isCore(source)) {
    return { found: true, path: null };
  }

  try {
    return { found: true, path: resolve.sync(source, opts(file, config)) };
  } catch (err) {
    return { found: false };
  }
}

function opts(file, config) {
  return Object.assign(
    {
      extensions: ['.ts'],
    },
    config,
    {
      // path.resolve will handle paths relative to CWD
      basedir: path.dirname(path.resolve(file)),
    }
  );
}
