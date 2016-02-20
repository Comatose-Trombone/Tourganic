import React from 'react'

export default class CreatedEventsEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      /* dummy data for now */
      <div> {props.userMadeEvent} </div>
    )
  }

}