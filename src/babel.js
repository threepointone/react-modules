let template = require('babel-template')

let wrapper = template('callback => require.ensure([], require => callback(null, SOURCE))')
// todo - catch error on loading modules / error boundaries 

let TRUE = template('true')

function replace(attr) {
  let val = wrapper({ SOURCE: attr.value.expression })  
  attr.value.expression = val.expression
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      JSXElement(path) {
        if(path.node.openingElement.name.name === 'Modules') {
          let include = path.node.openingElement.attributes.filter(attr => attr.name.name === 'include').length > 0
          if(!include) {
            path.node.openingElement.attributes.forEach(attr => 
              attr.name.name === 'load' && replace(attr) )
            path.node.openingElement.attributes.push(
              t.jSXAttribute(t.jSXIdentifier('transpiled'), 
              t.jSXExpressionContainer(TRUE().expression)))  
          }          
        }
      }
    } 
  }
}
