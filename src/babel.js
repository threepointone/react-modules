let template = require('babel-template')

let boilerplate = `callback => require.ensure([], require => {
  let success = false, ret
  try{
    ret = SOURCE
    success = true
  }
  catch(err) {
    callback(err) 
  }
  if(success){
    callback(null, ret)  
  }
}`

let wrapper = template(boilerplate + ')')

let wrapperWithName = template(boilerplate + ', NAME)')

let TRUE = template('true')

function replace(attr, name) {
  let val = (name ? wrapperWithName : wrapper)({ SOURCE: attr.value.expression, NAME: name })  
  attr.value.expression = val.expression
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      JSXElement(path) {
        if(path.node.openingElement.name.name === 'Modules') {
          let chunkName = path.node.openingElement.attributes.filter(attr => 
            attr.name.name === 'chunkName')[0]
          chunkName = chunkName ? chunkName.value : undefined

          let included = path.node.openingElement.attributes.filter(attr => 
            attr.name.name === 'include').length > 0
          
          if(!included) {
            path.node.openingElement.attributes.forEach(attr => 
              attr.name.name === 'load' && replace(attr, chunkName) )
            
            path.node.openingElement.attributes.push(
              t.jSXAttribute(t.jSXIdentifier('transpiled'), 
              t.jSXExpressionContainer(TRUE().expression)))  
          }          
        }
      }
    } 
  }
}


