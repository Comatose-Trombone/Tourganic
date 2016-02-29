import React from 'react'
import $ from 'jquery'
export default class CreatedToursListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      city: "",
      date: "",
      price: "",
      show: false
    }

  }

  // Redirect to unique tour page upon click, using tour's unique id
  handleTourClick() {
    window.location = 'http://localhost:8080/#/profile/' + this.props.tourId;
  }

  componentDidMount () {
    $.post('http://localhost:8080/fetchTourInfo', {data: this.props.tourId})
    .done( (data) => {
      var date = data.date.substring(0,10);
      this.setState({
        name : data.name,
        city : data.city,
        date : date,
        price : data.price
      })
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }

  close() {
    this.setState({show:false});
  };

  show() {
    this.setState({
      show:true
    });
  };
  
  render() {
    return (
       <div className='createTourForm'>
        <Modal
          show={this.state.show}
          dialogClassName="custom-modal"
          onHide={this.close.bind(this)}
          container={this}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a Tour</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='tourContainer' onClick={ () => this.handleTourClick() }>
              <div> {this.state.name} </div>
              <div> {this.state.city} </div>
              <div> {this.state.date} </div>
              <div> ${this.state.price} </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>

    )
  }

}