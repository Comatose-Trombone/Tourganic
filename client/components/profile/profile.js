import React from 'react'
import AboutMe from './AboutMe'
import CreatedToursList from './CreatedToursList'
import $ from 'jquery'
import {Link} from 'react-router'
import CreateTourForm from './CreateTourForm'
import Tour from '../Tour/Tour'


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      user: '',
      aboutMe: '',
      userMadeTours: [],
      showCreateForm: false,
      currentTour: {name: 'default', location: 'default', price:'1', date:'1/1/1'},
      showTourModal: false
    }
  }

  componentWillMount () {
    $.get('https://localhost:8080/profile')
    .done( (data) => {
      // if no session, restrict function will return {isAuth: false} in data
      // if this is true, we want to redirect to signin page
      if (data.isAuth === false) {
        console.log('please login first. redirecting..');
        window.location = 'https://localhost:8080/#/welcome'
      } else {
        this.setState({
          showProfile: true,
          user : data.username,
          aboutMe : data.aboutMe,
          userMadeTours : data.createdTours
        })
      }
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }

  submitNewTour(tourInfo) {
    $.post('https://localhost:8080/createTour', tourInfo)
    .done( (data) => {
      this.setState({
        userMadeTours: data.createdTours
      })
    })
    .fail( (err) => {
      console.log('err', err);
    })
  }

  getTourInfo(tour) {
    //props will be passed into here, which contains all of the tour information
    this.setState({
      currentTour: tour,
      showTourModal: true
    })
  }

  closeTourModal() {
    this.setState({showTourModal:false});
  };

  render() {
    var createdTourListProps = {tourIds: this.state.userMadeTours, getTourInfo: this.getTourInfo.bind(this)}
    var TourModalProps = {page: 'profile', currentTour: this.state.currentTour, closeTourModal: this.closeTourModal.bind(this), show: this.state.showTourModal}
    var profilePage = (
      <div className='profileMotherContainer'>
        <Tour {...TourModalProps}/>
        <AboutMe user={this.state.user} aboutMe={this.state.aboutMe}/>
        <CreateTourForm submitNewTour={this.submitNewTour.bind(this)}/>
        <CreatedToursList {...createdTourListProps} />
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