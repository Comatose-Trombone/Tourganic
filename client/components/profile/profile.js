
import React from 'react'
import AboutMe from './AboutMe'
import CreatedEventsList from './CreatedEventsList'


export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'DANIELJOSH',
      userMadeEvents: [
        { Name: "Event 1", Location: "Location 1" }, 
        { Name: 'Event 2', Location: 'Location 2' }
      ]
    }
  }


  render() {
    return (
      <div>
        <AboutMe user={this.state.user}/>
        <CreatedEventsList tours={this.state.userMadeEvents} />
      </div>
    )
  }
}