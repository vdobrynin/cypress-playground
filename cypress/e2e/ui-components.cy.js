/// <reference types="cypress" />

beforeEach('Open application', () => {
    cy.visit('/')
})

it('input fields', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    const name = 'Artem'
    cy.get('#inputEmail1').type('hello@test.com', { delay: 100 }).clear().type('hello', { delay: 100 }).clear()
    // cy.contains('nb-card', 'Using the Grid')
    //     .contains('Email').type("Yes 'it' works")// -> if we use label clear() after type() won't work
    cy.contains('nb-card', 'Using the Grid').contains('Email').type(`${name}@test.com`)

    cy.get('#inputEmail1').should('have.value', `${name}@test.com`).clear()
        .type('test@bondaracademy.com') // --> to clear before typing in dynamic input
    cy.get('#inputEmail1').should('not.have.value', '').clear()
        .type('test@bondaracademy.com') // --> if it's not empty clear() then type something

    cy.get('#inputEmail1').should('not.have.value', '').clear().type('test@bondaracademy.com')
        .press(Cypress.Keyboard.Keys.TAB) // --> use for accessibility testing (Cypress.Keyboard.Keys.TAB)

    cy.contains('Auth').click()
    cy.contains('Login').click()

    cy.get('#input-email').type('test@bondaracademy.com', { delay: 30 }) // --> this slow typing { delay: 30 }
    cy.get('#input-password').type('Welcome{enter}', { delay: 30 }) // --> {enter} this is submit button for Log In
    // cy.get('#input-password').type('Welcome{enter}')
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
    // cy.contains('nb-card', 'Using the Grid').contains('Option 1').click() // or .check({ force: true })
    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 1')
        .find('input').check({ force: true }) // --> use check which is recommended 
})

it('checkboxes', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.get('[type="checkbox"]').check({ force: true })
    cy.get('[type="checkbox"]').uncheck({ force: true })
    // cy.get('[type="checkbox"]').click({ force: true }) // will not work

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
    // cy.get('nav ngx-header nb-select button').should('have.css', 'background-color', 'rgb(25, 32, 56)')
    // cy.get('nav ngx-header nb-select button').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    // // example 2
    // cy.get('nav nb-select').then(dropdown => {
    //     cy.wrap(dropdown).click()                       // looping through 4 elements w/index below
    //     // cy.wait(300)
    //     cy.get('.options-list nb-option').each((listItem, index) => { 
    //         const itemText = listItem.text().trim()
    //         const colors = {
    //             "Light": "rgb(255, 255, 255)",
    //             "Dark": "rgb(25, 32, 56)",
    //             "Cosmic": "rgb(50, 50, 89)",
    //             "Corporate": "rgb(255, 255, 255)"
    //         }
    //         cy.wrap(listItem).click()
    //         cy.wrap(dropdown).should('contain', itemText)
    //         cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
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
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => {
        expect(confirm).to.equal('Are you sure you want to delete?')
    })

    // // example 1. --> not preferable code 
    cy.get('.nb-trash').first().click()
    cy.on('window:confirm', confirm => {
        expect(confirm).to.equal('Are you sure you want to delete?')
    })

    // // example 2. --> BEST OPTION !!! to create stub
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
    cy.get('.nb-plus').click()          // click on the plus
    cy.get('thead tr').eq(2).then(tableRow => {                  // find 3d column to add without editiphier
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
        cy.wrap(tableRow).find('.nb-checkmark').click() // save changes
    })
    cy.get('tbody tr').first().find('td').then(tableColumns => {   // validation of creation a person
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

it('datepickers', () => {
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    function selectDateFromCurrentDay(day) {
        let date = new Date()
        date.setDate(date.getDate() + day)
        // date.setDate(date.getDate() + 150)  // --> this is hardcoded day
        // console.log(date)                                                    //--> to find date in DevTools   
        let futureDay = date.getDate()                                          // change date to the day
        let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })
        let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`  // re-write to be dynamic
        // let dateToAssert = `Feb ${futureDay}, 2026`                // hardcoded --> change date to the day

        cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
            if (!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)) {
                cy.get('[data-name="chevron-right"]').click()
                selectDateFromCurrentDay(day)
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
            }
        })
        return dateToAssert
    }

    cy.get('[placeholder="Form Picker"]').then(input => {
        cy.wrap(input).click()
        const dateToAssert = selectDateFromCurrentDay(150) //--> calling function above to choose thy we want 
        // selectDateFromCurrentDay() 
        // // cy.wrap(input).should('have.value', dateToAssert)                       // assertion v.1 dynamic
        // // cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)  // assertion v.2 variation
        // cy.get('.day-cell').not('.bounding-month').contains(futureDay).click() // move up to 'else'
        // cy.get('.day-cell').not('.bounding-month').contains(19).click()   //--> this was hardcoded day
        cy.wrap(input).should('have.value', dateToAssert)
        // cy.wrap(input).should('have.value', 'Feb 19, 2026')   // hardcoded                        
    })
})

it('sliders', () => {
    cy.get('[tabtitle="Temperature"] circle')
        .invoke('attr', 'cx', '38.66')
        .invoke('attr', 'cy', '57.75')
        .click()
    cy.get('[class="value temperature h1"]').should('contain.text', '18')
})

it.only('drag & drop', () => {
    cy.contains('Extra Components').click()
    cy.contains('Drag & Drop').click()

    cy.get('#todo-list div').first().trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
})

it('iframes', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()
    cy.frameLoaded('[data-cy="esc-close-iframe"]')

    // 1st option
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()
    cy.contains('Dismiss Dialog').click()

    // 2nd option
    cy.enter('[data-cy="esc-close-iframe"]').then(getBody => {
        getBody().contains('Open Dialog with esc close').click()
        cy.contains('Dismiss Dialog').click()
        getBody().contains('Open Dialog without esc close').click()
        cy.contains('OK').click()
    })
})