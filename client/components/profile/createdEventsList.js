import React from 'react'
import CreatedEventsEntry from './CreatedEventsEntry'

export default class CreatedEventsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.tours = props.tours;
  }

  render() {

    if (typeof this.tours !== 'undefined') {
      var eventListEntries = this.tours.map((userMadeEvent) =>
        <CreatedEventsEntry userMadeEvent={userMadeEvent} />
      );
    }

    return (
      <div className='createdEventsListParentContainer'>
        <p>Here is the Created Events List Page! </p>
        {eventListEntries}
      </div>
    )
  }

}