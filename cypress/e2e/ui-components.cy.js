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

it('checkboxes', () => {
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

it('lists and dropdowns', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.contains('div', 'Toast type:').find('select').select('info').should('have.value', 'info')
    cy.contains('div', 'Toast type:').find('select').select('warning').should('have.value', 'warning')

    cy.contains('div', 'Position:').find('nb-select').click()
    cy.get('.option-list').contains('bottom-right').click()
    cy.contains('div', 'Position:').find('nb-select').should('have.text', 'bottom-right')

    cy.contains('div', 'Position:').find('nb-select').then(dropdown => {
        cy.wrap(dropdown).click()
        cy.get('.option-list nb-option').each((option, index, list) => {
            cy.wrap(option).click()
            if (index < list.length - 1)
                cy.wrap(dropdown).click()
        })
    })

    // // example 1
    cy.get('nav nb-select').click()
    cy.get('.option-list nb-option').contains('Dark').click()        // '.options-list' class name
    cy.get('nav nb-select').should('contain', 'Dark')       // assertion
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    // // example 2
    // cy.get('nav nb-select').then(dropdown => {
    //     cy.wrap(dropdown).click()
    //     cy.get('.options-list nb-option').each((listItem, index) => { // looping through 4 elements w/index
    //         const itemText = listItem.text().trim()
    //         // const colors = {
    //         //     "Light": "rgb(255, 255, 255)",
    //         //     "Dark": "rgb(34, 43, 69)",
    //         //     "Cosmic": "rgb(50, 50, 89)",
    //         //     "Corporate": "rgb(255, 255, 255)"
    //         // }
    //         cy.wrap(listItem).click()
    //         cy.wrap(dropdown).should('contain', itemText)
    //         // cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
    //         if (index < 3) {
    //             cy.wrap(dropdown).click()       // open dropdown list
    //         }
    //     })
    // })
})

it('tooltips', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('button', 'Top').trigger('mouseenter')
    cy.get('nb-tooltip').should('have.text', 'This is a tooltip')

    cy.contains('button', 'Success').trigger('mouseenter')
    cy.get('nb-tooltip').should('have.text', 'This is a tooltip')
})

it('dialog boxes', () => {
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    // // example 0 --> not preferable code cause code will never be executed !!!
    // cy.get('tbody tr').first().find('.nb-trash').click()
    // cy.on('window:confirm', (confirm) => {
    //     expect(confirm).to.equal('Are you sure you want to delete?')
    // })

    // // example 1. --> not preferable code 
    // cy.get('.nb-trash').first().click()
    // cy.on('window:confirm', confirm => {
    //     expect(confirm).to.equal('Are you sure you want to delete?')
    // })

    // // example 2. --> BEST ! to create stub
    cy.window().then(win => {
        // cy.stub(win, 'confirm').as('dialogBox').returns(true) // to except the dialog message to delete "OK"
        cy.stub(win, 'confirm').as('dialogBox').returns(false) // to NOT except the dialog message "Cancel"
    })
    cy.get('.nb-trash').first().click()
    cy.get('@dialogBox').should('be.calledWith', 'Are you sure you want to delete?')
})

it('web tables', () => {
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    // 1. How to find by text in table
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()                          // class '.nb-edit'
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
        cy.wrap(tableRow).find('.nb-checkmark').click()                     // class '.nb-checkmark'
        cy.wrap(tableRow).find('td').last().should('have.text', '35')
    })

    // 2. How to find by index in table
    cy.get('.nb-plus').click()
    cy.get('thead tr').eq(2).then(tableRow => {                          // find 3d column to add without editiphier
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
        cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then(tableColumns => {        // validation of creation a person
        cy.wrap(tableColumns).eq(2).should('have.text', 'John')
        cy.wrap(tableColumns).eq(3).should('have.text', 'Smith')
    })

    //3. Looping though the rows
    const ages = [20, 30, 40, 200]

    cy.wrap(ages).each(age => {
        cy.get('[placeholder="Age"]').clear().type(age)
        // cy.get('[placeholder="Age"]').clear().type(20)
        cy.wait(300)                                        // try to avoiding using wait
        cy.get('tbody tr').each(tableRows => {
            if (age == 200) {
                cy.wrap(tableRows).should('contain.text', 'No data found')
            } else {
                cy.wrap(tableRows).find('td').last().should('have.text', age)
                // cy.wrap(tableRows).find('td').last().should('have.text', 20)
            }
        })
    })
})

it.only('datepickers', () => {
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    function selectDateFromCurrentDay(day) {
        let date = new Date()
        date.setDate(date.getDate() + day)
        // date.setDate((date.getDate() + 200))  // --> this is hardcoded day
        // console.log(date)                                                    // --> to find date in DevTools   
        let futureDay = date.getDate()                                             // change date to the day
        let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })
        let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`    // re-write to be dynamic
        // let dateToAssert = `Oct ${futureDay}, 2025`                              // change date to the day

        cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
            if (!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)) {
                cy.get('[data-name="chevron-right"]').click()
                selectDateFromCurrentDay(day)
                // selectDateFromCurrentDay()
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
            }
        })
        return dateToAssert
    }

    cy.get('[placeholder="Form Picker"]').then(input => {
        // cy.contains('nb-card', 'Common Datepicker').find('input').then(input => { // old version of function
        cy.wrap(input).click()
        const dateToAssert = selectDateFromCurrentDay(20) // --> calling function above to choose thy we want 
        // selectDateFromCurrentDay()
        cy.wrap(input).should('have.value', dateToAssert)                       // assertion v.1 dynamic
        // cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)  // assertion v.2 variation

        // cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        // cy.get('.day-cell').not('.bounding-month').contains(25).click()   //--> this was hardcoded day
                       
        // cy.wrap(input).should('have.value', 'Sep 25, 2025')                           
    })
})