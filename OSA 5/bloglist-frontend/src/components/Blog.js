import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, sort, setStatusType, setStatusMessage }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const [likeAmount, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'silver'
  }

  const handleMoreInfo = () => {
    setMoreInfo(!moreInfo)
  }

  const handleLike = async event => {
    event.preventDefault()
    try {
      await blogService.update(blog.id.toString())
      setLikes(likeAmount + 1)
      sort()
    }catch (error){
      setStatusType('error')
      setStatusMessage(`Unable to like ${blog.title}`)
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async event => {
    event.preventDefault()
    if (window.confirm('Delete blog ' + blog.title + '?')) {
      try {

        await blogService.remove(blog.id.toString())
        sort()
      } catch(error){
        setStatusType('error')
        setStatusMessage(`Unauthorized to delete ${blog.title}`)
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      }
    }
  }

  if (moreInfo) {
    return (
      <div id='openContainerID' style={blogStyle}>
        <div>{blog.title} <button  onClick={handleMoreInfo}>Hide</button></div>
        <div>{blog.url}</div>
        Likes: <div id='likeAmountID'>{likeAmount}</div> <button id='likeID' onClick={handleLike}>Like</button>
        <div>{blog.author}</div>
        <button id='deleteID' onClick={handleDelete}> Delete</button>
      </div>
    )
  } else {
    return (
      <div id='closedContainerID' style={blogStyle}>
        <div>{blog.title} {blog.author} <button id='viewID' onClick={handleMoreInfo}>View</button></div>
      </div>
    )
  }
}

export default Blog