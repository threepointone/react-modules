import React from 'react'
import { render } from 'react-dom'
import { App } from './app'
// import { hydrate } from '../src'

// hydrate()

render(<App/>, document.getElementById('app'))


// let x = 

//   <div>
//     <Sidebar/>
//     <Match pattern="/search/:term">{ ({ params }) => 
//       <Modules entry="search" load={require('./search.js')}>{ Search => 
//         <Search term={params.term} />
//       }</Modules>
//     }</Match>
//     <Match pattern="/user/:uid">{ ({ params }) => 
//       <Modules entry="user" load={require('./user.js')}>{ User => 
//         <User uid={params.uid} />
//       }</Modules>
//     }</Match>  
//     <Miss component={NotFound}/>
//   </div>
