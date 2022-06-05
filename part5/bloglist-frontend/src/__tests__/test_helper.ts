import { BlogType } from '../types'

const initBlogs : BlogType[]  = [
  {
    id: '629ab9d8a56eadad26fa1f1f',
    title: 'Good Day',
    author: 'M&M',
    url: 'https://testing-library.com/docs/queries/about/',
    likes: 0,
    user: {
      username: 'Ola Dip',
      id: '629ab9d8a56eadad26fa1f1f'
    }
  }
]

const testHelper = {
  initBlogs
}
export default testHelper
