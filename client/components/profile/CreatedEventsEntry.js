import React from 'react'
import $ from 'jquery'

export default class CreatedEventsEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      price: ""
    }
  }

  // Redirect to specified tour page upon click, using tour's unique id
  handleTourClick() {
    window.location = 'http://localhost:8080/#/profile/' + this.props.userMadeEvent;
  }

  componentDidMount () {
    $.post('http://localhost:8080/fetchTourInfo', {data: this.props.userMadeEvent})
    .done( (data) => {
      this.setState({
        name : data.name,
        location : data.location,
        price : data.price
      })
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }

  render() {
    return (
      <div onClick={ () => this.handleTourClick() }>
        <span className='eventContainer'> {this.state.name} </span>
        <span className='eventContainer'> {this.state.location} </span>
        <span className='eventContainer'> {this.state.price} </span>
      </div>
    )
  }

}