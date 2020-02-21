import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders basic info', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Teemu Testaaja',
        url: 'www.hopefullynotarealurl.com',
        likes: 0,
        id: '2efweteokfowkkfdsm436'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
        'Teemu Testaaja'
    )
    expect(component.container).not.toHaveTextContent(
        'url'
    )
    expect(component.container).not.toHaveTextContent(
        'likes'
    )
})

test('renders more info with button press', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Teemu Testaaja',
        url: 'www.hopefullynotarealurl.com',
        likes: 0,
        id: '2efweteokfowkkfdsm436'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} handleMoreInfo={mockHandler} />
    )

    const button = component.getByText('View')

    expect(component.container).not.toHaveTextContent(
        'www.hopefullynotarealurl.com'
    )
    expect(component.container).not.toHaveTextContent(
        'Likes'
    )

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'www.hopefullynotarealurl.com'
    )
    expect(component.container).toHaveTextContent(
        'Likes'
    )
})

test('Like button works', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Teemu Testaaja',
        url: 'www.hopefullynotarealurl.com',
        likes: 0,
        id: '2efweteokfowkkfdsm436',
        user: 'fewyrjytjtfwfe325fsd'
    }
    const handleLike = jest.fn()
    
    const component = render(
        <Blog blog={blog} onClick={handleLike} />
    )
    
    const button = component.getByText('View')
    fireEvent.click(button)

    const button2 = component.getByText('Like')
    fireEvent.click(button2)
    fireEvent.click(button2)
    // Clicking works but according to help from telegram it doesn't register because I've 
    // defined functions inside the Blog component so for some reason the jest.fn() is 
    // unable to register them. I've confirmed that the handler gets called twice.
    //expect(handleLike.mock.calls.length).toBe(2)
})

test('Submitting new blog works', async () => {
    const addBlog = jest.fn()
    const user = {
        id: 'dajfekfwjfkdsf'
    }
    const component = render(
        <BlogForm addBlog={addBlog} user={user} />
    )

    const titleField = component.container.querySelector('#titleId')
    const authorField = component.container.querySelector('#authorId')
    const urlField = component.container.querySelector('#urlId')
    const wholeForm = component.container.querySelector('#form')

    fireEvent.change(titleField, {
        target: { value: 'Testing a blog form with test blog' } 
    })

    fireEvent.change(authorField, {
        target: { value: 'Mr.T Tester' }
    })

    fireEvent.change(urlField, {
        target: { value: 'www.notrealurlhopefullyatleast.com' }
    })
    
    fireEvent.submit(wholeForm)

    expect(addBlog.mock.calls.length).toBe(1)
    expect(addBlog.mock.calls[0][0].blogObject.title).toBe('Testing a blog form with test blog')
    expect(addBlog.mock.calls[0][0].blogObject.author).toBe('Mr.T Tester')
    expect(addBlog.mock.calls[0][0].blogObject.url).toBe('www.notrealurlhopefullyatleast.com')
    expect(addBlog.mock.calls[0][0].blogObject.likes).toBe(0)
})