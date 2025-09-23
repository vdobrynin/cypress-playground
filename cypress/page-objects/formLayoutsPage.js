
class FormLayoutsPage {

    // --> grid for submission
    submitUsingTheGridForm(email, password, optionIndex) { 
        cy.contains('nb-card', 'Using the Grid').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="radio"]').eq(optionIndex).click({ force: true })
            cy.wrap(form).contains('Sign in') 
        })
    }

    // --> basic form submission
    submitBasicForm(email, password, isCheckboxSelected) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            if (isCheckboxSelected) {
                cy.wrap(form).find('[type="checkbox"]').click({ force: true })
            }
            cy.wrap(form).contains('Submit')
        })
    }
}

export const onFormLayoutsPage = new FormLayoutsPage()