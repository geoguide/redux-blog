import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends React.Component {

  onSubmit(values) {

    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Title"
          component={this.renderField}
        />
        <Field
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        <Field
          name="content"
          label="Post Content"
          component={this.renderField}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger" style={styles.cancelButton}>Cancel</Link>
        </div>
      </form>
    );
  }



  renderField(field) {
    const { touched, error } = field.meta;
    const fgClassName = `form-group ${touched && error ? 'has-danger' : ''}`;
    const fcClassName = `form-control ${touched && error ? 'is-invalid' : ''}`;
    return (
      <div className={fgClassName} style={styles.formGroup}>
        <label>{field.label}</label>
        <input
          type="text"
          className={fcClassName}
          {...field.input}
        />
        <div className="invalid-tooltip">{field.meta.touched ? field.meta.error : ''}</div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  //validate inputs
  if(!values.title) {
    errors.title = 'Enter a Title!';
  }
  if(!values.categories) {
    errors.categories = 'Enter a Category!';
  }
  if(!values.content) {
    errors.content = 'Enter Content!';
  }
  return errors;
}

const styles = {
  cancelButton: {
    marginLeft: '15px'
  },
  formGroup: {
    position: 'relative'
  }
};

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
