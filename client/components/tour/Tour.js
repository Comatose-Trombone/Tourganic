import React from 'react'
import $ from 'jquery'

export default class Tour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : "",
      location : "",
      price : "",
      description: "",
      createdBy: ""
    }
  }

  componentDidMount () {
    var urlSplit1 = window.location.href.split('/');
    var urlSplit2 = urlSplit1[urlSplit1.length-1].split('?');
    var id = urlSplit2[0];
    $.post('http://localhost:8080/fetchTourInfo', {data: id})
    .done( (data) => {
      this.setState({
        name : data.name,
        location : data.location,
        price : data.price,
        description: data.description,
        createdBy: data.createdBy
      })
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }

  render() {
    return (
        <div className='tourContainer'>
          <ul>
            <li>{this.state.name}</li>
            <li>{this.state.location }</li>
            <li>{this.state.price}</li>
            <li>{this.state.description}</li>
            <li>{this.state.createdBy}</li>
          </ul>
        </div>
    )
  }
}