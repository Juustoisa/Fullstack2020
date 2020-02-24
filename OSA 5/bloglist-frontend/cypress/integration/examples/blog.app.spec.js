describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Teemu Testaaja',
      username: 'mrT',
      password: 'testeri'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('Blogs')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#usernameID').type('mrT')
      cy.get('#passwordID').type('testeri')
      cy.get('#loginButton').click()
      cy.contains('Teemu Testaaja logged in')
      cy.wait(500)
    })

    it('fails with wrong credentials', function () {
      cy.get('#usernameID').type('mrX')
      cy.get('#passwordID').type('testeri')
      cy.get('#loginButton').click()
      cy.wait(200)
      cy.get('.error').contains('wrong')
      cy.wait(500)
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#usernameID').type('mrT')
      cy.get('#passwordID').type('testeri')
      cy.get('#loginButton').click()
      cy.wait(100)
    })
/*
    it('A blog can be created, liked and deleted', function () {
      cy.contains('Create new blog').click()
      cy.get('#titleId').type('This cypress thing is pretty cool')
      cy.get('#authorId').type('Testing man')
      cy.get('#urlId').type('www.readthedocumentation.com')
      cy.wait(200)
      cy.get('#submitBlog').click()
      cy.wait(5000)
      cy.contains('This cypress thing is pretty cool')
      cy.get('#viewID').click()
      cy.contains('www.readthedocumentation.com')
      cy.contains('Likes: 0')
      cy.get('#likeID').click()
      cy.contains('Likes: 1')
      const stub = cy.stub()
      cy.get('#deleteID').click()
      cy.on('window:confirm', stub)
      cy.wait(500)
      cy
        .get('#viewID')
        .should('not.exist')
      cy.contains('Teemu Testaaja logged in')
    })
*/
    it('blogs are ordered based on like count', function () {
      cy.contains('Create new blog').click()
      cy.get('#titleId').type('This cypress thing is pretty cool')
      cy.get('#authorId').type('Testing man')
      cy.get('#urlId').type('www.readthedocumentation.com')
      cy.get('#submitBlog').click()
      cy.wait(500)
      cy.contains('Create new blog').click()
      cy.get('#titleId').type('This test took some time')
      cy.get('#authorId').type('Testing man')
      cy.get('#urlId').type('www.alsopreparetogooglealot.com')
      cy.get('#submitBlog').click()
      cy.wait(500)
      cy.get('#closedContainerID').eq(0).contains('cypress thing')
      cy.get('#viewID').eq(0).click()
      cy.get('#viewID').eq(0).click()
      cy.get('button').eq(8).click()
      cy.get('#openContainerID').first()
      cy.contains('test took some')
    })
  })
})