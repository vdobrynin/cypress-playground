/// <reference types="cypress" />

beforeEach('Open application', () => {
    cy.visit('/')
})

it('input fields', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    const name = 'Artem'
    cy.get('#inputEmail1').type('hello@test.com', { delay: 100 }).clear().type('hello', { delay: 100 }).clear()
    // cy.contains('nb-card', 'Using the Grid').contains('Email').type("Yes it's works")
    // cy.contains('nb-card', 'Using the Grid').contains('Email').type('Yes it is works') 
    cy.contains('nb-card', 'Using the Grid').contains('Email').type(`${name}@test.com`)

    cy.get('#inputEmail1').should('have.value', `${name}@test.com`).clear().type('test@bondaracademy.com')
    cy.get('#inputEmail1').should('not.have.value', '').clear().type('test@bondaracademy.com')

    cy.get('#inputEmail1').should('not.have.value', '').clear().type('test@bondaracademy.com')
        .press(Cypress.Keyboard.Keys.TAB)

    cy.contains('Auth').click()
    cy.contains('Login').click()

    cy.get('#input-email').type('test@bondaracademy.com')
    cy.get('#input-password').type('Welcome{enter}')
})

it('radio buttons', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons => {
        // cy.wrap(allRadioButtons).eq(0).check().should('be.checked') // --> don't work
        cy.wrap(allRadioButtons).eq(0).check({ force: true }).should('be.checked')
        cy.wrap(allRadioButtons).eq(1).check({ force: true })
        cy.wrap(allRadioButtons).eq(0).should('not.be.checked')
        cy.wrap(allRadioButtons).eq(2).should('be.disabled')
    })
    cy.contains('nb-card', 'Using the Grid').contains('Option 1').click() // or .check({ force: true })
    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 2')
        .find('input').check({ force: true })
})

it.only('checkboxes', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    // cy.get('[type="checkbox"]').check({ force: true }) // will not work 
    // cy.get('[type="checkbox"]').uncheck({ force: true }) // will not work too
    // cy.get('[type="checkbox"]').click({ force: true }) // will not work ether

    cy.get('[type="checkbox"]').check({ force: true }) // 
    cy.get('[type="checkbox"]').should('be.checked')   //

    cy.get('[type="checkbox"]').eq(0).click({ force: true }) // uncheck
    cy.get('[type="checkbox"]').eq(1).check({ force: true }) // check
    cy.get('[type="checkbox"]').eq(2).uncheck({ force: true }) // uncheck another one
})