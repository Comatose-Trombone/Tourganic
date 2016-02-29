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
    $.post('http://localhost:8080/joinTour', {data: this.getID()})
      .done( (data) => {
        if (data.isAuth === false) {
          this.setState({
            isLoggedIn: false
          })
          var setState = this.setState.bind(this);
          setTimeout(function(){
            setState({isLoggedIn:true})
          }, 3000);
          //trigger this to change state up in search
          this.props.close();
        } 
      })
      .fail( (err) => {
        console.log('error joining tour');
      })
  }

  render() {
    var loginReminder = <div>Please signin first</div>
    return (
      <div className='createTourForm'>
          {this.state.isLoggedIn ? null : loginReminder}
        <Modal
          show={this.props.show}
          dialogClassName="custom-modal"
          //this changes the state up in search, which will trickle down back to the state in tour
          onHide={this.props.close}
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
              <Button  bsStyle='default' bsSize='small' onClick={ () => this.handleJoinTourClick() }>
                Join Tour
              </Button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}