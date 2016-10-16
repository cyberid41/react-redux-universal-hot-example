import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { NewPostForm } from 'components';
import * as blogActions from 'redux/modules/blog';
import * as notifActions from 'redux/modules/notifs';

@connect(
  () => ({}),
  { ...notifActions, ...blogActions })
export default class NewPost extends Component {
  static propTypes = {
    location: PropTypes.object,
    post: PropTypes.func,
    notifSend: PropTypes.func
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  post = data => this.props.post(data).then(this.successPost);

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
        <NewPostForm onSubmit={this.post} initialValues={this.getInitialValues()} />
      </div>
    );
  }
}
