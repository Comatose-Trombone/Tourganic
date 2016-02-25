import React from 'react'
import CreatedEventsEntry from './CreatedEventsEntry'

export default class CreatedEventsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleTourClick() {
    window.location = 'http://localhost:8080/profile/' + this.props.userMadeEvent;
  }

  render() {
    var eventListEntries = this.props.tours.map((userMadeEvent) =>
      <CreatedEventsEntry handleTourClick={handleTourClick} userMadeEvent={userMadeEvent} />
    );

    return (
      <div className='createdEventsListParentContainer'>
        <p>Here is the Created Events List Page!</p>
        {eventListEntries}
      </div>
    )
  }

}