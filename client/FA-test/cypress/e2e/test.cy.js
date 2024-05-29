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
  it('Visits the About Page and read the contents', () => {
    cy.visit('http://localhost:5173/about')

    cy.scrollTo(100,350).wait(1000)
    cy.scrollTo(350,600).wait(1000)
    cy.scrollTo(600,850).wait(1000)
    cy.scrollTo(850,1100).wait(1000)
  })

  //Visits the Menu Page
  it('Visits the Menu Page and View the menu', () => {
    cy.visit('http://localhost:5173/menu')

    cy.scrollTo(100,500).wait(1000)
  })

  //Visits the Gallery Page 
  it('Visits the Gallery Page and Scrolls down', () => {
    cy.visit('http://localhost:5173/gallery')

    cy.wait(3000)

    cy.scrollTo(100,1280).wait(1000)
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
    cy.wait(2000)
    cy.get('nav > .items-center > .font-bold > .text-4xl').click()
  })

  //Goes back to About page
  // it('Go back to About page', () => {
  //   cy.get('nav > .items-center > .text-center > .uppercase').click()
  // })
})
