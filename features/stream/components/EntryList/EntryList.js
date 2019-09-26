import React from 'react';
import PropTypes from 'prop-types';
import Entry from "../Task";

const EntryList = ({tasks}) => {
	return tasks.map((obj) => {
		return <Entry key={obj.id} task={obj}/>
	});
}

EntryList.propTypes = {
	tasks: PropTypes.array.isRequired,
}

export default EntryList;