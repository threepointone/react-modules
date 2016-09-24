import React from 'react'
let isBrowser = typeof document !== 'undefined'

export class Modules extends React.Component {
  // static defaultProps = {
  //   onError() {}
  // }
  constructor(props) {
    super(props)
    if(!this.props.transpiled) { 
      if(this.props.defer) {
        // todo - prevent evaluation?
        return  
      }
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
      if(err) {
        if(!this.props.onError) {
          throw err
        }
        this.props.onError(err)        
      }
      if(sync) {
        this.state.loaded = loaded
      }
      else {
        this.setState({ loaded })
      }
    })
    sync = false 
  }
  unstable_handleError(err) {
    if(!this.props.onError) {
      throw err
    }
    this.props.onError(err)
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


// isBrowser && hydrate() // whate harm could this do 
