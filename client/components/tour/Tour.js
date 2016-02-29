import React from 'react'
import $ from 'jquery'
import {Button, Modal} from 'react-bootstrap'

export default class Tour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
      show: false

    }
  }

  // Isolate tour ID from the url
  getID() {
    var splitURL = window.location.href.split('/');
    var id = splitURL[splitURL.length-1].split('?')[0];
    return id;
  }

  // Add tour ID to user's attendingTours array if user is logged in
  handleJoinTourClick() {
    $.post('https://localhost:8080/joinTour', {data: this.getID()})
      .done( (data) => {
        if (data.isAuth === false) {
          this.setState({
            isLoggedIn: false
          })
          var setState = this.setState.bind(this);
          setTimeout(function(){
            setState({isLoggedIn:true})
          }, 3000);
        } else {
          // show/hide state is controlled in profile or search. closeTourModal changes the state,
          // then it inherits the state from profile or search through props.
          console.log("successfully joined");
          this.setState({
            isJoined: true
          }, function() {
            setTimeout(function(){
              window.location = 'https://localhost:8080/#/profile/';
            }, 2000); 
          })
          //after the joined message, takes you back to profile page
        }
      })
      .fail( (err) => {
        console.log('error joining tour');
      })
  }

  render() {
    var loginReminder = <div style={{marginTop: '5px'}}> Please sign in first.</div>
    var joinedTour= <div style={{marginTop: '5px'}}> Successfully joined the tour! </div>
    return (
      <div className='createTourForm'>
        <Modal
          show={this.props.show}
          dialogClassName="custom-modal"
          onHide={this.props.closeTourModal}
          container={this}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.currentTour.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{marginLeft: '15px'}}>
                <div>Address: {this.props.currentTour.streetAddress }</div>
                <div>City: {this.props.currentTour.city }</div>
                <div>State: {this.props.currentTour.state }</div>
                <div>Price: ${this.props.currentTour.price}</div>
                <div>Date: {this.props.currentTour.date.substring(5,10) + '-' + this.props.currentTour.date.substring(0,4)}</div>
                <div>Description: {this.props.currentTour.description}</div>
                <div>The Host: {this.props.currentTour.createdBy}</div>
            {/* hide the 'Join Tour' button, if it's the profile page */}
              {this.props.page === 'search' ? <Button  bsStyle='default' bsSize='small' onClick={ () => this.handleJoinTourClick() }>
                                                Join Tour
                                              </Button>
                                            : null }
              {this.state.isLoggedIn ? null : loginReminder}
              {this.state.isJoined ? joinedTour : null}

              
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}