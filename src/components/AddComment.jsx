import React, { useState } from 'react';

const AddComment = ( props ) => {
	const [ values, setValues ] = useState( {} );

	const handleChange = ( event ) => {
		event.persist();

		setValues( ( values ) => ( { ...values, [ event.target.name ]: event.target.value } ) );
	};

	const handleSubmit = ( event ) => {
		event.preventDefault();

		props.onCreate( values );
	};

	return (
		<form onSubmit={handleSubmit} className="AddComment">
			<input type="text" name="content" placeholder="Comment" value={values.content} onChange={handleChange} />
			<input className="create" type="submit" value="Create Comment" />
		</form>
	);
};

export default AddComment;
