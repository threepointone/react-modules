import React from 'react'
import { Modules } from '../src' 

export class App extends React.Component {
  render() {
    return <Modules load={require('./a.js')} >{
      ({ A } = {}) => A ? 
        <div>loaded<A/> </div> : 
        <span>loading</span>
    }</Modules>
  }
}
