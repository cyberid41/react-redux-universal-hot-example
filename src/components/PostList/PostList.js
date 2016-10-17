import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PostList = ({ post }) => (
  <div>
    <div className="media">
      <div className="media-body">
        <h4 className="media-heading"><strong><Link to={`blog/${post.slug}`}>{post.title}</Link></strong></h4>
        {post.body}
        <br />
        <Link to={`blog/${post._id}`}>Edit</Link>
      </div>
    </div>
    <br />
    <br />
  </div>
);

PostList.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostList;
