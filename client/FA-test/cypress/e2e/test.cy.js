describe('Web Test', () => {

  //Visits the website
  it('Visits the main page', () => {
    cy.visit('http://localhost:5173')
  })

  it('Checks the title', () => {
    cy.visit('http://localhost:5173')

    // Check if the title contains "Bazura"
    cy.title().should('include', 'Bazura Grill')
  })

  //Register Account
  it('Sign Up', () => {
    cy.visit('http://localhost:5173/login')

    //Clicking the Sign Up link
    cy.get('div > p > .text-green-500').click()

    //Fill up the input fields
    cy.get('div > form > input[name="email"]').type('mahmen@gmail.com')
    cy.get('div > form > input[name="username"]').type('mahmen')
    cy.get('div > form > input[name="password"]').type('yeahboi')
    cy.get('div > form > button[type="submit"]').click()
  })

  //Login
  it('Login', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('div > form > input[name="email"]').type('mahmen@gmail.com')
    cy.get('div > form > input[name="password"]').type('yeahboi{enter}')
  })

  //Reload the page
  it('Reloads the page', () => {
    cy.visit('http://localhost:5173')
    
    cy.reload()
  })

  //Visits the Abbout Page
  it('Visits the About Page', () => {
    cy.visit('http://localhost:5173/about')
  })

  //Visits the Menu Page
  it('Visits the Menu Page', () => {
    cy.visit('http://localhost:5173/menu')
  })

  //Visits the Gallery Page
  it('Visits the Gallery Page', () => {
    cy.visit('http://localhost:5173/gallery')

    cy.wait(4500)
  })

  //Visits the Contact Page
  it('Visits the Contact Page', () => {
    cy.visit('http://localhost:5173/contact')
  })

  //Sending feedback to the Bazura Grill
  it('Sends feedback to the Bazura Grill', () => {
    cy.visit('http://localhost:5173/contact')
    //Inputs the name
    cy.get('input[name="name"]').type('John')
    //Inputs the email
    cy.get('input[name="email"]').type('john5@gmail.com')
    //Inputs message
    cy.get('textarea[name="message"]').type('Nice ambience & Yummy food{enter}')
    //Submits the message
    cy.get('button[type="submit"]').click()
  })

  //Goes back to the main page
  it('Go back to the main page', () => {
    cy.visit('http://localhost:5173/contact')
    cy.get('nav > .items-center > .font-bold > .text-4xl').click()
  })
})
