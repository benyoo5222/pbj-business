import React, {Component} from 'react';
import Services from './services.js'

class Serviceslist extends Component {
  render() {
    const each_service = <Services data= {this.props.data}/>

    return (
      <main>
        {each_service}
      </main>
    )
  }
}

export default Serviceslist;