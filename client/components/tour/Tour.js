import React from 'react'
import $ from 'jquery'
import {Button, Modal} from 'react-bootstrap'

export default class Tour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
      show: false,
      showCannotJoinOwnTourError: false,
      isJoined: false
    }
  }

  // Isolate tour ID from the url


  // Add tour ID to user's attendingTours array if user is logged in
  handleJoinTourClick() {

    $.post('/joinTour', {data: this.props.currentTour._id})

      .done( (data) => {
        if (data.isAuth === false) {
          this.setState({
            isLoggedIn: false
          })
          var setState = this.setState.bind(this);
          setTimeout(function(){
            setState({isLoggedIn:true})
          }, 3000);
        } 
        else if (data === 'You cannot join your own tour.') {
          //show error message, hide after 2 seconds
          console.log('cannot join own tour');
          this.setState({
            showCannotJoinOwnTourError: true
          }, function() {
            setState = this.setState.bind(this);
            setTimeout(function(){
              setState({showCannotJoinOwnTourError: false})
            }, 2000); 
          })
        }
        else {
          // show/hide state is controlled in profile or search. closeTourModal changes the state,
          // then it inherits the state from profile or search through props.
          console.log("successfully joined");
          this.setState({
            isJoined: true
          }, function() {
            setTimeout(function(){
              window.location = '/#/profile/';
            }, 2000); 
          })
        }
      })
      .fail( (err) => {
        console.log('error joining tour');
      })
  }

  render() {
    var loginReminder = <div style={{marginTop: '5px'}}> Please sign in first.</div>
    var cannotJoinOwnTourError = <div style={{marginTop: '5px'}}> You cannot join your own tour. </div>
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
              {this.state.showCannotJoinOwnTourError ? cannotJoinOwnTourError: null}

              
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}