// split a hostname and reverse it
function splitter(dottedName) {
  return dottedName.split('.').reverse();
}

let Node = Map;

function Tree() {
  this._base = new Node();
}

/**
 * Prefix tree with same API as Map
 */
Tree.prototype = {
  set: function(item, val) {
    let parts = splitter(item),
      len = parts.length,
      node = this._base;

    for (let i = 0; i < len; i++) {
      let part = parts[i];
      if (!node.has(part)) {
        node.set(part, new Node());
      }
      node = node.get(part);
    }
    node.data = val;
  },

  get: function(item) {
    let parts = splitter(item),
      len = parts.length,
      node = this._base;

    for (let i = 0; i < len; i++) {
      let part = parts[i];
      if (!node.has(part)) {
        return undefined;
      }
      node = node.get(part);
    }
    return node.data;
  },

  has: function(item) {
    if (typeof this.get(item) == 'undefined') {
      return false;
    }
    return true;
  },

  delete: function(item) {
    let parts = splitter(item),
      len = parts.length,
      node = this._base,
      branch = [node];

    // crawl to end of branch
    for (let i = 0; i < len; i++) {
      let part = parts[i];
      if (!node.has(part)) {
        return false;
      }
      node = node.get(part);
      branch.push(node);
    }

    // delete if present
    if (!node.hasOwnProperty('data')) {
      return false;
    }
    delete node.data;

    // crawl back, deleting nodes with no children/data;
    for (let i = branch.length - 1; i > 0; i--) {
      if (branch[i].hasOwnProperty('data') || branch[i].size > 0) {
        break;
      }
      branch[i].delete(parts[i]);
    }
    return true;
  },
};
