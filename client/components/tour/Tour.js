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
    console.log('this.props.closeTourModal', this.props.closeTourModal);
    $.post('http://localhost:8080/joinTour', {data: this.getID()})
      .done( (data) => {
        // show/hide state is controlled in profile or search. closeTourModal changes the state,
        // then it inherits the state from profile or search through props.
        this.props.closeTourModal();
        if (data.isAuth === false) {
          this.setState({
            isLoggedIn: false
          })
          var setState = this.setState.bind(this);
          setTimeout(function(){
            setState({isLoggedIn:true})
          }, 3000);
        } else {
          console.log("successfully joined");
          this.setState({
            isJoined: true
          })
          //after the joined message, takes you back to profile page
          setTimeout(function(){
            window.location = 'http://localhost:8080/#/profile/'}, 1200); 
        }
      })
      .fail( (err) => {
        console.log('error joining tour');
      })
  }

  render() {
    var loginReminder = <div>Please signin first</div>
    var joinedTour= <div> Successfully joined the tour </div>
    return (
      <div className='createTourForm'>
          {this.state.isLoggedIn ? null : loginReminder}
          {this.state.isJoined ? joinedTour : null}
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
          <Modal.Body>
              <ul>
                <li>Address: {this.props.currentTour.streetAddress }</li>
                <li>City: {this.props.currentTour.city }</li>
                <li>State: {this.props.currentTour.state }</li>
                <li>Price: ${this.props.currentTour.price}</li>
                <li>Date: {this.props.currentTour.date.substring(0,10)}</li>
                <li>Description: {this.props.currentTour.description}</li>
                <li>The Host: {this.props.currentTour.createdBy}</li>
              </ul>
            {/* hide the 'Join Tour' button, if it's the profile page */}
              {this.props.page === 'search' ? <Button  bsStyle='default' bsSize='small' onClick={ () => this.handleJoinTourClick() }>
                                                Join Tour
                                              </Button>
                                            : null }
              
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}