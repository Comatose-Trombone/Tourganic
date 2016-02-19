import React from 'react'
import Search_List_Entry from 'SearchListEntry'
import underbar from 'underbar'

 
var SearchList = ({tours}) => {
	var SearchListEntries = tours.map((tour) =>
		<SearchListEntry 
			tour= {tour}
		/>
);

	return (
		<div >
			{SearchListEntries}
		</div>

	)
};
