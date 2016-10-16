import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { NewPostForm } from 'components';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';

@connect(
  () => ({}),
  { ...notifActions, ...authActions })
export default class NewPost extends Component {
  static propTypes = {
    location: PropTypes.object,
    newPost: PropTypes.func,
    notifSend: PropTypes.func
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  newPost = data => this.props.newPost(data).then(this.successPost);

  successPost = result => {
    this.props.notifSend({
      message: 'Post hase been published !',
      kind: 'success',
      dismissAfter: 2000
    });
    return result;
  }

  render() {
    return (
      <div className="container">
        <Helmet title="New Post" />
        <h1>Post New</h1>
        <NewPostForm onSubmit={this.newPost} initialValues={this.getInitialValues()} />
      </div>
    );
  }
}
