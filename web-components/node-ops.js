(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
      define(factory);
  } else if (typeof exports === 'object') {
      // Node, CommonJS之类的
      // $ = require('jquery')
      module.exports = factory();
  } else {
      // 浏览器全局变量(root 即 window)
      root.basic_node_ops = factory();
  }
}(this, function () {
  function createElement (tagName, vnode) {
    const elm = document.createElement(tagName)
    return elm
  }
  
  function createElementNS (namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
  }
  
  function createTextNode (text) {
    return document.createTextNode(text)
  }
  
  function createComment (text) {
    return document.createComment(text)
  }
  
  function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode)
  }
  
  function removeChild (node, child) {
    return node.removeChild(child)
  }
  
  function appendChild (node, child) {
    node.appendChild(child)
  }

  function getChild (node, index) {
    return node.children[index]
  }
  
  function parentNode (node) {
    return node.parentNode
  }
  
  function nextSibling (node) {
    return node.nextSibling
  }
  
  function tagName (node) {
    return node.tagName
  }
  
  function setTextContent (node, text) {
    node.textContent = text
  }

  function getElementRect(node) {
    var cloneElm = document.importNode(node, true);
    appendChild(document.documentElement, cloneElm);
    var rect = cloneElm.getBoundingClientRect();
    console.log(cloneElm);
    console.log(JSON.stringify(rect))
    removeChild(document.documentElement, cloneElm);
    return rect;
  }


  return {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getChild: getChild,
    getElementRect: getElementRect,
  }
}));

