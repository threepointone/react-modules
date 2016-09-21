import React from 'react'
import { Modules, preserve, preserved } from '../src' 

export class App extends React.Component {
  render() {
    return <Modules load={require('./a.js')} >{
      ({ A } = {}) => A ? 
        preserve('apphtml', <div> loaded <A/> </div>) : 
        preserved('apphtml') ? 
          <div dangerouslySetInnerHTML={{ __html: preserved('apphtml') }}/> :
          <span>loading...</span>
    }</Modules>
  }
}
