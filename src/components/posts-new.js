import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';

class PostsNew extends Component {

	// field.input is an obj that contains event handlers & props
	// ... means 'communicate
	renderField(field) {
		// field.meta.error comes from ReduxForm

		// ES6 destructuring. pulls the first value off the obj to remain DRY
		// ie, applies to field.meta.touched, field.meta.error
		const { meta: { touched, error } } = field;

		// ternary operator to determine error styling
		const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

		return (
			<div className={ className }>
				<label>{ field.label }</label>
				<input
					className="form-control" 
					type="text"
					{ ...field.input }
				/>
				<div className="text-help">{ touched ? error : '' }</div>
			</div>
		);

	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push("/");
		});
	}

	render() {
		const { handleSubmit } = this.props; 

		return (
			<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
				<Field
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Content"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}


function validate(values) {
	const errors = {};

	// validate inputs from 'values'
	if (!values.title) {
		errors.title = "Enter a title.";
	}
	if (!values.categories) {
		errors.categories = "Enter some categories.";
	}
	if (!values.content) {
		errors.content = "Fool! Your post has no content!";
	}

	// if errors empty, form can submit
	// if errors has properties, ReduxForm assumes form is invalid
	return errors;
}

export default reduxForm({
	// property names, ie PostNewForm, must be unique to avoid mutation 
	form: 'PostsNewForm', 
	// validate: validate ES6
	validate
})(
	connect(null,{ createPost })(PostsNew)
);



