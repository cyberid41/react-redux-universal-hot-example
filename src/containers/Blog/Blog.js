import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { loadPost } from 'redux/modules/blog';
import { PostList } from 'components';

@connect(
  state => ({
    posts: state.blog.posts
  }),
  { loadPost }
)
export default class Blog extends Component {
  static propTypes = {
    loadPost: PropTypes.func,
    posts: PropTypes.array
  };

  state = {
    title: '',
    body: '',
    slug: '',
    error: null
  };

  componentDidMount() {
    const blogService = app.service('blogs');
    // Find the last 25 messages
    blogService.find({
      query: {
        $sort: { createdAt: 1 },
        $limit: 25
      }
    }).then(page => this.props.loadPost(page.data.reverse()));
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="container">
        <h3>Blog Posts</h3>
        <br />
        <br />
        <div>
          {posts.map(post => <PostList post={post} />)}
        </div>
      </div>
    );
  }
}
