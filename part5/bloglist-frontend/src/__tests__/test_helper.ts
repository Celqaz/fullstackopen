import { BlogType } from '../types'

const initBlogs : BlogType[]  = [
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

const testHelper = {
  initBlogs
}
export default testHelper
