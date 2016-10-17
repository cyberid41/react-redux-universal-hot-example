import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import newPostValidation from './newPostValidation';

@reduxForm({
  form: 'post',
  validate: newPostValidation
})
export default class NewPost extends Component {
  static propTypes = {
    ...propTypes
  }

  renderInput = ({ input, label, type, meta: { touched, error } }) =>
    <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
      <label htmlFor={input.name} className="col-sm-2">{label}</label>
      <div className="col-sm-10">
        <input {...input} type={type} className="form-control" />
        {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
        {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
      </div>
    </div>;

  renderTextarea = ({ input, label, type, meta: { touched, error } }) =>
    <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
      <label htmlFor={input.name} className="col-sm-2">{label}</label>
      <div className="col-sm-10">
        <textarea {...input} type={type} className="form-control" ></textarea>
        {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
        {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
      </div>
    </div>;

  render() {
    const { handleSubmit, error, pristine, reset, submitting } = this.props;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Field name="title" type="text" component={this.renderInput} label="Title" />
        <Field name="body" type="text" component={this.renderTextarea} label="Body" />
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <div className="col-sm-offset-2">
          <button className="btn btn-success" disabled={pristine || submitting} type="submit">
            Publish Post
          </button>
          <button className="btn"type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
        </div>
      </form>
    );
  }
}
