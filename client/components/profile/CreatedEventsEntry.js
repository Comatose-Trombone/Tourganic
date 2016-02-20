import React from 'react'

export default class CreatedEventsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      /* dummy data for now */
      <div> {this.props.userMadeEvent.Name} </div>
    )
  }

}