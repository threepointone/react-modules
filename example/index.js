import React from 'react'

import { render } from 'react-dom'

import { Modules } from '../src'

class App extends React.Component {
  render() {
    return <Modules load={require('./a.js')}>{
      ({ A } = {}) => A ? 
        <div>loaded<A/> </div> : 
        <span>loading</span>
    }</Modules>
  }
}

render(<App/>, document.getElementById('app'))
