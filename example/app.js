import React from 'react'
import { Modules } from '../src' 
import { BrowserRouter, Match, Miss, Link } from 'react-router'

function log(msg = this) {
  console.log(msg)
  return this
}

export class App extends React.Component {
  render() {
    return <BrowserRouter>
      <div>
        <Match pattern="/" exactly render={() => <div>we home</div>}/>
        
        <Match pattern="/a" render={() => <Modules load={require('./a').default}>{
            A => A ? <A/> : <span>loading A...</span>
          }</Modules>}/>
        <Match pattern="/b" render={() => <Modules load={require('./b').default}>{
            B => B ? <B/> : <span>loading B...</span>
          }</Modules>}/>
        <Miss render={() => <span>no match</span>}/>

        <ul>
          <li><Link to="/a">to a</Link></li>
          <li><Link to="/b">to b</Link></li>
          <li><Link to="/">home</Link></li>
        </ul>
      </div>
    </BrowserRouter>
    
  }
}
