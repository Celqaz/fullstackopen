import '@testing-library/jest-dom/extend-expect'
import Blogs from '../components/Blogs'
import { fireEvent, render, waitFor } from '@testing-library/react'
import testHelper from './test_helper'


describe('<Blog/> test', () => {

  test('render Blogs correctly', () => {
    const component = render(
      <Blogs blogs={testHelper.initBlogs}/>
    )
    const visibleDiv = component.container.querySelector('.defaultBlogInfo')
    const hiddenDiv = component.container.querySelector('.hiddenContent')
    expect(visibleDiv).toHaveTextContent(
      'Good Day M&M'
    )
    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('show hidden url and likes when click show button', () => {
    // const mockHandler = jest.fn()

    const component = render(
      <Blogs blogs={testHelper.initBlogs}/>
    )
    const button = component.getByText('show')
    fireEvent.click(button)
    // expect(mockHandler.mock.calls).toHaveLength(1)
    const hiddenDiv = component.container.querySelector('.hiddenContent')
    expect(hiddenDiv).not.toHaveStyle('display: none')
    const blogUrl = hiddenDiv?.querySelector('.blogUrl')
    expect(blogUrl).toHaveTextContent(testHelper.initBlogs[0].url)
    const blogLikes = hiddenDiv?.querySelector('.blogLikes')
    expect(blogLikes).toHaveTextContent(`likes:${testHelper.initBlogs[0].likes}`)
  })

  test('should fire like button correctly', async () => {
    const component = render(
      <Blogs blogs={testHelper.initBlogs}/>
    )
    // query the like button
    const likeButton = component.container.querySelector('.hiddenContent button')
    expect(likeButton).toHaveTextContent(/^like$/)
    // click like
    fireEvent.click(likeButton as Element)
    // expect likes up by 1
    const likes = component.container.querySelector('.blogLikes')
    await waitFor(() => {
      expect(likes).toHaveTextContent(`likes:${testHelper.initBlogs[0].likes + 1}`)
    })
  })
})

