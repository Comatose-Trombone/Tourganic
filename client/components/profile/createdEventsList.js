import React from 'react'
import CreatedEventsEntry from './EventEntry'

export default class CreatedEventsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.tours = props.tours;
  }

  render() {
    var eventListEntries = this.tours.map((userMadeEvent) =>
      <CreatedEventsEntry userMadeEvent={userMadeEvent} />
    );

    return (
      <div>
        {eventListEntries}
      </div>
    )
  }

}