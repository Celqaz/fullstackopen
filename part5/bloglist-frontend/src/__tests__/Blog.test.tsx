import '@testing-library/jest-dom/extend-expect'
import { BlogType } from '../types'
// import Blogs from '../components/Blogs'
// import { render } from '@testing-library/react'


describe('<Blog/> test',()=>{
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
  console.log(blogs)


//   test('render Blogs', () => {
//
//
//     const component = render(
//       <Blogs blogs={blogs}/>
//     )
//     expect(component.container).toHaveTextContent(
//       'Good Day'
//     )
//   })
//
})

