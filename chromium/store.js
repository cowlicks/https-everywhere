"use strict";

(function(exports) {

let background = require('./background');

function setStorage(store) {
  Object.assign(exports, {
    get: store.get,
    set: store.set,
  });
}

if (chrome.storage.sync) {
  chrome.storage.sync.set({"sync-set-test": true}, () => {
    if(chrome.runtime.lastError){
      setStorage(chrome.storage.local);
    } else {
      setStorage(chrome.storage.sync);
    }
    background.initialize();
  });
} else {
  setStorage(chrome.storage.local);
  background.initialize();
}

})(typeof exports == 'undefined' ? require.scopes.store = {} : exports);
