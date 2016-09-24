import * as path from 'path'
import * as fs from 'fs'

import * as babylon from 'babylon'
import traverse from 'babel-traverse'


export default function extract(file) {
  // iterate through files / dependency tree
  // parse with babel / detect <Match entry, extract sub entry='' as deps
  // return { [entry] : [, deps] }
  let ret = {}
  let dir = path.dirname(file)
  let files = fs.readdirSync(dir)
  files.forEach(f => {
    let ext = path.extname(f)
    if(ext === '.js') {
      let src = fs.readFileSync(path.join(dir, f), 'utf8')
      let ast = babylon.parse(src, {
        sourceType: 'module',
        plugins: [  'jsx', 'flow', 'doExpressions', 'objectRestSpread', 'decorators', 'classProperties',
                    'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent' ]
      })
      traverse(ast, {
        enter(x) {
          if(x.type === 'JSXElement' && x.node.openingElement.name.name === 'Match') {

            let attrs = x.node.openingElement.attributes
            let hasPattern = attrs.filter(attr => attr.name.name === 'pattern')
            if(hasPattern.length > 0) {
              hasPattern = hasPattern[0].value.value
            }
            else {
              hasPattern = undefined
            }
            if(hasPattern) {
              // pull out entries 
              let entries = src.substring(x.node.start, x.node.end)
              let regex = /entry\=['"](.*?)['"]/g
              let m, matches = [] 
              while ((m = regex.exec(entries)) !== null) {                  
                matches.push(m[1])                  
              }
              if(matches.length > 0) {
                ret[hasPattern] = ret[hasPattern] || []
                ret[hasPattern] = ret[hasPattern].concat(matches)  
              }
            }
          }
        }
      })
    }
  })
  return ret
}
