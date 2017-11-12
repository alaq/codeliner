'use strict'

var Tree = require('js-tree')
var proto = Tree.prototype

proto.updateNodesPosition = function () {
  var top = 1
  var left = 1
  var root = this.getIndex(1)
  var self = this

  root.top = top++
  root.left = left++

  if (root.children && root.children.length) {
    walk(root.children, root, left, root.node.collapsed)
  }

  function walk(children, parent, left, collapsed) {
    var height = 1
    children.forEach(function (id) {
      var node = self.getIndex(id)
      if (collapsed) {
        node.top = null
        node.left = null
      } else {
        node.top = top++
        node.left = left
      }

      if (node.children && node.children.length) {
        height += walk(
          node.children,
          node,
          left + 1,
          collapsed || node.node.collapsed
        )
      } else {
        node.height = 1
        height += 1
      }
    })

    if (parent.node.collapsed) parent.height = 1
    else parent.height = height
    return parent.height
  }
}

proto.move = function (fromId, toId, placement) {
  if (fromId === toId || toId === 1) return

  var obj = this.remove(fromId);
  var index = null;

  if (placement === 'before') index = this.insertBefore(obj, toId)
  else if (placement === 'after') index = this.insertAfter(obj, toId)
  else if (placement === 'prepend') index = this.prepend(obj, toId)
  else if (placement === 'append') index = this.append(obj, toId)

  // todo: perf
  this.updateNodesPosition();
  return index;
}

// Here we update the content of the node (node.module)
proto.update = function (id, newValue, tree, nod, jankySetState, functions) {
  this.indexes[id.id].node.module = newValue;
  const node = nod;

  function compile(str) {
    
      if (str.indexOf('{') === -1) return eval(str);

      str = '}' + str + '{';
    
      var values = [],          // an array to collect the strings that are found
        rxp = /{([^}]+)}/g,
        curMatch;
    
      while (curMatch = rxp.exec(str)) {
        values.push(curMatch[1]);
      }
    
      const strSplit = [];
      str.split('}').forEach(subCode => {
        strSplit.push(subCode.split('{')[0])
    
      })
      strSplit.shift();
    
      let result = ''
      strSplit.forEach((string, i) => {

        result += string + (eval(functions + values[i]) || '');
      });
    
      return result;
    }

  // lets declare the functions
  // newValue = '{' + functions + '}' + '\n' + newValue;

  try {
    // const result = eval(newValue.toString());
    console.log(newValue);
    const result = compile(newValue);
    if (typeof result === 'object') this.indexes[id.id].node.result = JSON.stringify(result);
    else this.indexes[id.id].node.result = result;
  } catch (e) {
    this.indexes[id.id].node.result = e.toString();
  }

  // this.updateNodesPosition(); // not sure this is necessary
  jankySetState({ input: newValue });
};

proto.getNodeByTop = function (top) {
  var indexes = this.indexes;
  for (var id in indexes) {
    if (indexes.hasOwnProperty(id)) {
      if (indexes[id].top === top) return indexes[id]
    }
  }
}

module.exports = Tree;
