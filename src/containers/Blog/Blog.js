import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { loadPost } from 'redux/modules/blog';

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
        $sort: { createdAt: -1 },
        $limit: 25
      }
    }).then(page => this.props.loadPost(page.data.reverse()));
  }

  componentWillUnmount() {
    app.service('blogs').removeListener('created', this.props.loadPost);
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="container">
        <h1>Blog Posts</h1>
        <div>
          <ul>
            {posts.map(post => <li><strong>{post.title}</strong><br /> {post.body}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}
