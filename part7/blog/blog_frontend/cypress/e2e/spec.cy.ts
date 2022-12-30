/// <reference types="cypress" />
import '../support/commands'

describe('spec.cy.ts', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testName',
      username: 'test',
      password: 'testp'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Login to Application')
  })
  describe('login', function () {
    it('fail to  login with correct username and password', function () {
      cy.get('#username_input').type('wrong')
      cy.get('#password_input').type('wrong')
      cy.get('#login_button').click()
      // cy.contains("invalid username or password")
      cy.get('.failureInfo').should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(139, 0, 0)')
        .and('have.css', 'border-style', 'dashed')

      cy.get('html').should('not.contain', 'wrong logged in')
    })

    it('can login with correct username and password', function () {
      // cy.get('#username_input').type('test')
      // cy.get('#password_input').type('testp')
      // cy.get('#login_button').click()
      cy.login('test',  'testp')

      cy.get('html').should('contain', 'test logged in')
    })
  })

  describe("when logged in",function (){
    beforeEach(function (){
      cy.login('test',  'testp')
      cy.addBlog()
    })
    it('A blog can be created', function() {
      cy.get('.toggleDiv .showContentButton button').click()
      cy.get('#title_input').type('Test Title')
      cy.get('#author_input').type('Test Author')
      cy.get('#url_input').type('Test Url')
      cy.get('#submit_newBlog').click()
    //  result
      cy.get('.successInfo').should('contain', 'a new blog Test Title by Test Author added')
      cy.get('.blogsContent .blogContent').should('contain','Test Title')
    })
    it('should like a post', function () {

      // cy.get('.blogsContent .blogContent:first button').should('contain','like')
      cy.get('.blogsContent .blogContent #visibleButton').click()
      cy.get('.blogsContent .blogContent #likeBlogButton').click()
      cy.get('.blogsContent .blogContent #blogLikes').should('contain','likes:1')
    })
    it.only('should delete this post',function (){
      cy.get('.blogsContent .blogContent #visibleButton').click()
      cy.get('.blogsContent .blogContent #removeBlog').click()
      cy.get('.blogsContent').should('not.contain','New Test Gandalf')
    })
  })
})

export {}
