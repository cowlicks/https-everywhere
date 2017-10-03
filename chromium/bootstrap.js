function require(module) {
  if (module.startsWith('./') && !module.hasOwnProperty(module.slice(2))) {
    return require.scopes[module.slice(2)];
  }
  throw 'module: ' + module + ' not found';
}
require.scopes = {};
