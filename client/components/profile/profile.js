
import React from 'react'
import AboutMe from './AboutMe'
import CreatedEventsList from './CreatedEventsList'
import $ from 'jquery'
import {Link} from 'react-router'

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
  getProfile() {
    $.post('http://localhost:8080/profile', {name: 'NAME', some: 'sample data'})
    .done( (data) => {
      console.log('successful getProfile', data);
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }


  render() {
    return (
      <div>
        <AboutMe user={this.state.user}/>
        <CreatedEventsList tours={this.state.userMadeEvents} />
        <input type='submit' onClick={this.getProfile.bind(this)} value='Get Profile' />
      </div>
    )
  }
}