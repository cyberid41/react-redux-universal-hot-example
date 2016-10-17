import React, { PropTypes } from 'react';

const PostList = ({ post }) => (
  <div className="row">
    <p>{post.title}</p>
    <p>{post.body}</p>
  </div>
);

PostList.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostList;
