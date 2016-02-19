import React from 'react'
import EventEntry from './EventEntry'

class createdEventsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var eventListEntries = props.results.map((result) =>
      <EventEntry result = {result} />
    );

    return (
      <div>
        {eventListEntries}
      </div>
    )
  }

}