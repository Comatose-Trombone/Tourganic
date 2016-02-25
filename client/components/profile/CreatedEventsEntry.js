import React from 'react'

export default class CreatedEventsEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('propsusermadevent in createdeventsentry', this.props.tour.name);
    return (
      <div className='eventContainer'> {this.props.tour.name} </div>
    )
  }

}