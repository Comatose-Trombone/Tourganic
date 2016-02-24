
import React from 'react'
import AboutMe from './AboutMe'
import CreatedEventsList from './CreatedEventsList'
import $ from 'jquery'
import {Link} from 'react-router'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      description: "",
      userMadeEvents: [
        { Name: "Event 1", Location: "Location 1" }, 
        { Name: 'Event 2', Location: 'Location 2' }
      ]
    }
  }
  componentDidMount () {
    $.get('http://localhost:8080/profile')
    .done( (data) => {
      this.setState({
        user : data.username,
        description : data.description,
        userMadeEvents : data.createdEvents
      })
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }

        // <input type='submit' onClick={this.getProfile.bind(this)} value='Get Profile' />

  render() {
    return (
      <div>
        <AboutMe user={this.state.user} description={this.state.description}/>
        <CreatedEventsList tours={this.state.userMadeEvents} />
      </div>
    )
  }
}