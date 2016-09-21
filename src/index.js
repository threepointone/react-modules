import React from 'react'

export class Modules extends React.Component {
  constructor(props) {
    super(props)
    if(!this.props.transpiled) { 
      this.state = {
        loaded: this.props.load
      }
      return 
    }

    // possible async load 
    this.state = {
      loaded: undefined
    }   
    let sync = true

    this.props.load((err, loaded) => {
      // todo - check err 
      if(sync) {
        this.state.loaded = loaded
      }
      else {
        this.setState({ loaded })
      }
    })
    sync = false 
  }
  
  componentWillReceiveProps() {
    // hot loading and stuff 
  } 

  render() {
    return this.props.children(this.state.loaded)
  }
}


let cache = {}
export function hydrate() {
  // get all data-preserve
  // cache innerhtml
  [ ...document.querySelectorAll('[data-preserve]') ].forEach(el => {
    let id = el.getAttribute('data-preserve')
    if(cache[id]) {
      console.warn(`overwriting previous key ${id}!`) // eslint-disable-line no-console
    }
    cache[id] = el.innerHTML
  })
}

export function flush() {
  cache = {}
}

export function preserve(id, element) { 
  if(!(typeof element.type === 'string')) {
    throw new Error('cannot preserve non-DOM element')
  }
  return React.cloneElement(element, { 'data-preserve': id })
}


export function preserved(id, Tag = 'div', props = {}) {
  return cache[id] ? <Tag {...props} dangerouslySetInnerHTML={{ __html: cache[id] }} /> : undefined
}
