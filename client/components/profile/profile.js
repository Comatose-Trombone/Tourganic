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
      showProfile: false,
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
      // if no session, restrict function will return {isAuth: false} in data
      // if this is true, we want to redirect to signin page
      if (data.isAuth === false) {
        console.log('please login first. redirecting..');
        window.location = 'http://localhost:8080/#/signin'
      } else {
        this.setState({
          showProfile: true,
          user : data.username,
          description : data.description,
          userMadeTours : data.createdTours
        })
      }
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


  render() {
    var profilePage = (
      <div>
        <input type='submit' value={this.state.showCreateFormButtonValue} onClick={this.toggleCreateForm.bind(this)}/>
        {this.state.showCreateForm ? <CreateTourForm submitNewTour={this.submitNewTour}/> : null}
        <AboutMe user={this.state.user} description={this.state.description}/>
        <CreatedToursList tourIds={this.state.userMadeTours} />
     </div>
    );

    return (
      // ComponentWillMount will change showProfile to true once that async call is complete. Before that happens,
      // showProfile will be false. This prevents people from viewing the profile page before they log in (in fact,
      // without this check, they see a ~0.5 second flash of the page because it renders before the ajax call is done )
      this.state.showProfile ? profilePage : null
    )
  };





}