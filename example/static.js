import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './app'

console.log(renderToString(<App/>))
