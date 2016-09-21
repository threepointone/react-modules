let template = require('babel-template')

let wrapper = template(`callback => require.ensure([], require => {
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
})`)

let wrapperWithName = template(`callback => require.ensure([], require => {
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
}, NAME)`)
// todo - catch error on loading modules / error boundaries 

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
          let bundleName = path.node.openingElement.attributes.filter(attr => 
            attr.name.name === 'name')[0]
          bundleName = bundleName ? bundleName.value : undefined

          let included = path.node.openingElement.attributes.filter(attr => 
            attr.name.name === 'include').length > 0
          
          if(!included) {
            path.node.openingElement.attributes.forEach(attr => 
              attr.name.name === 'load' && replace(attr, bundleName) )
            
            path.node.openingElement.attributes.push(
              t.jSXAttribute(t.jSXIdentifier('transpiled'), 
              t.jSXExpressionContainer(TRUE().expression)))  
          }          
        }
      }
    } 
  }
}
