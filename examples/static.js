import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './app'

import { ServerRouter, createServerRenderContext } from 'react-router'
const context = createServerRenderContext()

let markup = renderToString(
    <ServerRouter
      location={'/'}
      context={context}>
      <App/>
    </ServerRouter>
  )

console.log(markup)

 // // the result will tell you if it redirected, if so, we ignore
 //  // the markup and send a proper redirect.
 //  if (result.redirect) {
 //    res.writeHead(301, {
 //      Location: result.redirect.pathname
 //    })
 //    res.end()
 //  } else {

 //    // the result will tell you if there were any misses, if so
 //    // we can send a 404 and then do a second render pass with
 //    // the context to clue the <Miss> components into rendering
 //    // this time (on the client they know from componentDidMount)
 //    if (result.missed) {
 //      res.writeHead(404)
 //      markup = renderToString(
 //        <ServerRouter
 //          location={req.url}
 //          context={context}
 //        >
 //          <App/>
 //        </ServerRouter>
 //      )
 //    }
 //    res.write(markup)
 //    res.end()
