import React from 'react'
import AboutMe from './AboutMe'
import CreatedToursList from './CreatedToursList'
import $ from 'jquery'
import {Link} from 'react-router'
import CreateTourForm from './CreateTourForm'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      description: '',
      userMadeTours: [],
      showCreateForm: false,
      showCreateFormButtonValue: 'Create a Tour'
    }
  }
  componentWillMount () {
    $.get('http://localhost:8080/profile')
    .done( (data) => {
      this.setState({
        user : data.username,
        description : data.description,
        userMadeTours : data.createdTours
      })
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }

  submitNewTour(tourInfo) {
    $.post('/createTour', tourInfo)
    .done( (data) => {
      this.setState({
        userMadeTours: data.createdTours
      })
    })
    .fail( (err) => {
      console.log('err', err);
    })
  }

  toggleCreateForm() {
    var currentStatus = this.state.showCreateForm;
    var tempState = this.state.showCreateFormButtonValue === 'Create a Tour' ? 'Hide Form' : 'Create a Tour';
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
        {this.state.showCreateForm ? <CreateTourForm submitNewTour={this.submitNewTour}/> : null}
        <AboutMe user={this.state.user} description={this.state.description}/>
        <CreatedToursList tours={this.state.userMadeTours} />
      </div>
    )
  }
}