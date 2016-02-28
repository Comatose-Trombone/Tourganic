import React from 'react'
import CreatedToursListEntry from './CreatedToursListEntry'

export default class CreatedToursList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (typeof this.props.tourIds !== 'undefined') {
      var tourListEntries = this.props.tourIds.map(tourId =>
        <CreatedToursListEntry tourId={tourId} />)
      console.log(tourListEntries);
    }
    return (
      <div className = "createdToursListParentContainer">
       <p className='hostedTourTitle'> Your Hosted Tours: </p>
       {tourListEntries ? tourListEntries : null}
      </div>
    )
}
}