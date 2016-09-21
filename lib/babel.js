'use strict';

var template = require('babel-template');

var wrapper = template('callback => require.ensure([], require => callback(null, SOURCE))');
// todo - catch error on loading modules / error boundaries 

var TRUE = template('true');

function replace(attr) {
  var val = wrapper({ SOURCE: attr.value.expression });
  attr.value.expression = val.expression;
}

module.exports = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      JSXElement: function JSXElement(path) {
        if (path.node.openingElement.name.name === 'Modules') {
          var included = path.node.openingElement.attributes.filter(function (attr) {
            return attr.name.name === 'include';
          }).length > 0;

          if (!included) {
            path.node.openingElement.attributes.forEach(function (attr) {
              return attr.name.name === 'load' && replace(attr);
            });

            path.node.openingElement.attributes.push(t.jSXAttribute(t.jSXIdentifier('transpiled'), t.jSXExpressionContainer(TRUE().expression)));
          }
        }
      }
    }
  };
};