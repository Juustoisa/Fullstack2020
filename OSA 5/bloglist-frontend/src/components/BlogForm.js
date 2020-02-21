import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  user,
  addBlog
}) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const createBlog = () => {

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user.id
    }
    addBlog({ blogObject })
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={createBlog} id='form'>
        <div>
          Title:
          <input
            type="text"
            id='titleId'
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            id='authorId'
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            id='urlId'
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button id='submitBlog' type="submit">Create blog</button>
      </form>
    </div>
  )

}

BlogForm.propTypes = {
  setStatusType: PropTypes.func,
  setStatusMessage: PropTypes.func,
  setBlogs: PropTypes.func,
  newTitle: PropTypes.string,
  newAuthor: PropTypes.string,
  newUrl: PropTypes.string,
}

export default BlogForm