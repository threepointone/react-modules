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
    // todo - preserve server rendered html?
    return this.props.children(this.state.loaded)
  }
}
