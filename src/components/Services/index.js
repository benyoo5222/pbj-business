import React, {Component} from 'react';
import Services from './services.js'

class Serviceslist extends Component {
  render() {
    const each_service = this.props.data.services.map(eachService =>
      <Services data = {eachService} key = {eachService["_id"]}/>
    )


    return (
      <main>
        {each_service}
      </main>
    )
  }
}

export default Serviceslist;