import React from 'react'
import AboutMe from './AboutMe'
import CreatedEventsList from './CreatedEventsList'

class profile extends React.Component {
  constructor(props) {
    super(props)
  }

  this.state = {
    results: [
      {
        Name: "Event 1",
        Location: "Location 1"
      }
    ]
  }

  render() {
    return (
      <div>
        <AboutMe />
        <CreatedEventsList tours={this.state.results} />

      </div>
    )
  }
}


