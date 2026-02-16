
class FormLayoutsPage {
    /**
     * Method to submit Using The Grid form with valid user credentials
     * @param {string} - valid user email 
     * @param {string} - valid user password  of the option radio button. Start from 0.
     * @param {number} optionIndex - provide index
     */
    // --> grid for submission in form
    submitUsingTheGridForm(email, password, optionIndex) { 
        cy.contains('nb-card', 'Using the Grid').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="radio"]').eq(optionIndex).check({ force: true })
            cy.wrap(form).contains('Sign in') 
        })
    }

    // --> basic form submission
    submitBasicForm(email, password, isCheckboxSelected) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            if (isCheckboxSelected) {
                cy.wrap(form).find('[type="checkbox"]').check({ force: true })
            }
            cy.wrap(form).contains('Submit')
        })
    }
}

export const onFormLayoutsPage = new FormLayoutsPage()