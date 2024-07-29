import React from 'react';
import PropTypes from 'prop-types';

const BlogList = ({ blogs = [], title, handleDelete }) => {
  return (
    <div className="creation">
      <h2>{title}</h2>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div className="blog-preview" key={blog.id}>
            <h2>{blog.title}</h2>
            <p>Written by: {blog.author}</p>
            <button onClick={() => handleDelete(blog.id)}>Delete Blog</button>
          </div>
        ))
      )}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array,
  title: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default BlogList;
