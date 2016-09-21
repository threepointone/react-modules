import React from 'react'
import { Modules, preserve, preserved } from '../src' 

export class App extends React.Component {
  render() {
    return <Modules load={require('./a.js')} >{
      ({ A } = {}) => A ? 
        (console.log(1), preserve('apphtml', <div>
          loaded
          <A/> 
        </div>)) : 
        preserved('apphtml') ? 
          (console.log(2), <div dangerouslySetInnerHTML={{ __html: preserved('apphtml') }}/>) :
          (console.log(3), <span>loading...</span>)
    }</Modules>
  }
}
