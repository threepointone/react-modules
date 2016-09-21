import React from 'react'
import { render } from 'react-dom'
import { App } from './app'
import { hydrate } from '../src'

hydrate()

render(<App/>, document.getElementById('app'))
