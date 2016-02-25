import React from 'react'
import CreatedEventsEntry from './CreatedEventsEntry'

export default class CreatedEventsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (typeof this.props.tours !== 'undefined') {
      var eventListEntries = this.props.tours.map(event =>
        <CreatedEventsEntry tour={event} />)
    }
    return (
      <div className = "CreatedEventsListParentContainer">
       <p> Here is the Created Events </p>
       {eventListEntries ? eventListEntries : null}
      </div>
    )
}
}