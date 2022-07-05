import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components//Togglable'

const blog = {
    author: 'test tester',
    id: '61613bd1617f1c4fcc67d7bb',
    likes: 0,
    title: 'This is a blog for testing',
    url: 'test.blog.com',
    user:
        {
            username: 'tume',
            name: 'tuomas',
            id: '614ea6432fcdbdc8df656dbf'
        }
}

test('Blog renders content', () => {

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'This is a blog for testing'
    )
})



describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel='show...'>
                <div className='testDiv' />
            </Togglable>
        )
    })

    test('reneders its childeren', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    test('at start only title and author are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking button, children are displayer', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed with cancel button', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const closeButton = component.container.querySelector('button:nth-child(2')
        fireEvent.click(closeButton)

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})

describe('<Blog />', () => {
    let component
    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog blog={blog} handleLikes={mockHandler}/>
        )
    })

    test('at first only blog title and author are displayed', () => {
        const div = component.container.querySelector('.blog')

        expect(div).toHaveTextContent(
            'This is a blog for testing'
        )
        expect(div).toHaveTextContent(
            'test tester'
        )
    })

    test('clicking show button on blog shows url and likes', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const div = component.container.querySelector('.blog')

        expect(div).toHaveTextContent(
            'This is a blog for testing'
        )

        expect(div).toHaveTextContent(
            'test.blog.com'
        )

        expect(div).toHaveTextContent(
            'test tester'
        )

        expect(div).toHaveTextContent(
            'likes: 0'
        )
    })

    test('clicking the like button twice calls event handler twice', async () => {
        const button = component.getByText('like')

        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})

describe('<BlogForm />', () => {
    test('BlogForm updates parent state and calls onSubmit', () => {
        const createBlog = jest.fn()

        const component = render(
            <BlogForm createBlog={createBlog} />
        )

        const author = component.container.querySelector('#author')
        const title = component.container.querySelector('#title')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(author, {
            target: { value: 'test tester'}
        })

        fireEvent.change(title, {
            target: { value: 'testing frontend'}
        })

        fireEvent.change(url, {
            target: { value: 'test.url.test'}
        })

        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].author).toBe('test tester')
        expect(createBlog.mock.calls[0][0].title).toBe('testing frontend')
        expect(createBlog.mock.calls[0][0].url).toBe('test.url.test')


    })

})