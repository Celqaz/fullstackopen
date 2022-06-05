import '@testing-library/jest-dom/extend-expect'
import { BlogType } from '../types'
import Blogs from '../components/Blogs'
import { render } from '@testing-library/react'


describe('<Blog/> test', () => {
  const blogs: BlogType[] = [
    {
      id: '212',
      title: 'Good Day',
      author: 'M&M',
      url: 'https://testing-library.com/docs/queries/about/',
      likes: 0,
      user: {
        username: 'Ola Dip',
        id: '2323444'
      }
    }
  ]

  test('render Blogs correctly', () => {


    const component = render(
      <Blogs blogs={blogs}/>
    )
    const visiableDiv = component.container.querySelector('.defaultBlogInfo')
    const hiddenDiv = component.container.querySelector('.hiddenContent')
    expect(visiableDiv).toHaveTextContent(
      'Good Day M&M'
    )
    expect(hiddenDiv).toHaveStyle('display: none')
  })
})

