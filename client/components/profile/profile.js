
import React from 'react'
import AboutMe from './AboutMe'
import CreatedEventsList from './CreatedEventsList'
import $ from 'jquery'
import {Link} from 'react-router'
import CreateEventForm from './createEventForm'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      description: '',
      userMadeEvents: [],
      showCreateForm: false,
      showCreateFormButtonValue: 'Create an Event'
    }
  }
  componentWillMount () {
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

  submitNewEvent(eventInfo) {
    // console.log(eventInfo);
    $.post('/createEvent', eventInfo)
    .done( (data) => {
      console.log('event created, page re-rendering..');
    })
    .fail( (err) => {
      console.log('err', err);
    })
  }

  toggleCreateForm() {
    var currentStatus = this.state.showCreateForm;
    var tempState = this.state.showCreateFormButtonValue === 'Create an Event' ? 'Hide Form' : 'Create an Event';
    this.setState({
      showCreateForm: !currentStatus,
      showCreateFormButtonValue: tempState
    })
  }

        // <input type='submit' onClick={this.getProfile.bind(this)} value='Get Profile' />

  render() {
    return (
      <div>
        <input type='submit' value={this.state.showCreateFormButtonValue} onClick={this.toggleCreateForm.bind(this)}/>
        {this.state.showCreateForm ? <CreateEventForm submitNewEvent={this.submitNewEvent}/> : null}
        <AboutMe user={this.state.user} description={this.state.description}/>
        <CreatedEventsList tours={this.state.userMadeEvents} />
      </div>
    )
  }
}