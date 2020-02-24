import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [statusType, setStatusType] = useState(null)

  const BlogFormRef = React.createRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort(function (a, b) {
          return b.likes - a.likes
        })
      )
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={statusType}>
        {message}
      </div>
    )
  }

  const sortBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort(function (a, b) {
          return b.likes - a.likes
        })
      )
    )
  }

  const addBlog = async ({ blogObject }) => {
    BlogFormRef.current.toggleVisibility()
    try {
      await blogService
        .create(blogObject)
      setBlogs(blogs.concat(blogObject))
      setStatusType('success')
      setStatusMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      sortBlogs()
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)

    } catch (exception) {

      setStatusType('error')
      setStatusMessage('Unable to create blog, a blog should have a title and an url')
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setStatusType('success')
      setStatusMessage(
        `Logged in as ${user.name}`
      )
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
      setStatusType('error')
      setStatusMessage('wrong username or password')
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    setStatusType('success')
    setStatusMessage(
      'Logged out successfully'
    )
    setTimeout(() => {
      setStatusMessage(null)
    }, 5000)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h3>Please login first</h3>
      <div>
        username
        <input
          type="text"
          id='usernameID'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='passwordID'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginButton' type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div id='wholeBlogForm'>
      <Togglable id='createBlogButton' buttonLabel="Create new blog" ref={BlogFormRef}>
        <BlogForm
          user={user}
          addBlog={addBlog}
        />
      </Togglable>
      <h3>Current blogs</h3>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          sort={sortBlogs}
          setStatusMessage={setStatusMessage}
          setStatusType={setStatusType} />
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={statusMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App