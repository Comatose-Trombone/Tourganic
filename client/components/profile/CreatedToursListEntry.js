import React from 'react'
import $ from 'jquery'

export default class CreatedToursListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      city: "",
      date: "",
      price: ""
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

  render() {
    return (
      <div className='eventContainer' onClick={ () => this.handleTourClick() }>
        <div className='tourContainer'> {this.state.name} </div>
        <div className='tourContainer'> {this.state.city} </div>
        <div className='tourContainer'> {this.state.date} </div>
        <div className='tourContainer'> ${this.state.price} </div>
      </div>
    )
  }

}