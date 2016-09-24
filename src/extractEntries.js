import * as path from 'path'
import * as fs from 'fs'

import * as babylon from 'babylon'
import traverse from 'babel-traverse'

export default function extract(file) {
  // iterate through files / dependency tree
  // parse with babel / detect <modules entry, extract requires as deps
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
        plugins: [ 'jsx' ]
      })
      traverse(ast, {
        enter(x) {
          if(x.type === 'JSXElement' && x.node.openingElement.name.name === 'Modules') {
            let attrs = x.node.openingElement.attributes
            let hasEntry = attrs.filter(attr => attr.name.name === 'entry')
            if(hasEntry.length > 0) {
              hasEntry = hasEntry[0].value.value
            }
            else {
              hasEntry = undefined
            }
            if(hasEntry) {
              let hasLoad = attrs.filter(attr => attr.name.name === 'load')
              if(hasLoad.length > 0) {
                hasLoad = hasLoad[0].value.expression
              }
              else {
                hasLoad = undefined
              }

              // parse hasload for all require calls
              if(hasLoad) {
                let reqs = src.substring(hasLoad.start, hasLoad.end)
                let regex = /require\(['"](.*?)['"]\)/g
                let m, matches = [] 
                while ((m = regex.exec(reqs)) !== null) {                  
                  matches.push(path.join(dir, m[1]))                  
                }
                if(matches.length > 0) {
                  ret[hasEntry] = ret[hasEntry] || []
                  ret[hasEntry] = ret[hasEntry].concat(matches)  
                }
                
              }
            }
          }          
        }
      })
    }  
  })
  Object.keys(ret).forEach(key => {
    ret[key].push(file)
  })
  return ret
  
}
