import React from 'react'


export default class SearchListEntry extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		var pictures = ['brooklynSkyline.jpg', 'goldenGateBridge.jpg', 'Park2.JPG', 'Houses.jpg', 'Berkeley.jpg', 'Marina.jpg', 'Denver.jpg', 'OutdoorCafe.jpg', 'LosAngeles.jpg', 'Tahoe.jpg', 'cableCar.jpg'];
		var index = Math.floor(Math.random()*pictures.length);
		var url = pictures[index];
		console.log(url);
		return (
		//on click, will pass props, which contains the tour info, back up to Search.js
			<div style={{backgroundImage: 'url(' + url + ')', backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundPosition: 'center center'}} className='searchTourEntry' onClick={this.props.getTourInfo.bind(null, this.props.tour)}>
				<div className='searchListEntryName'>{this.props.tour.name}</div>
				<div className='searchListEntryPrice'>${this.props.tour.price}</div>
			</div>
		)
	}
};


