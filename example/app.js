

        import React from 'react'
        import { Modules, preserve, preserved } from '../src' 

        export class App extends React.Component {
          render() {
            return <Modules load={require('./a.js')} >{
              ({ A } = {}) => A ? 
                preserve('myhtml', <div> loaded <A/> </div>) : 
                preserved('myhtml') ||
                <span>loading...</span> 
            }</Modules>
          }
        }
