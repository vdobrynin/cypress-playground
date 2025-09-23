
function selectDateFromCurrentDay(day) {           // copy/paste from ui-components
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()                                             // change date to the day
    let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })
    let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })
    let futureYear = date.getFullYear()
    let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`    // re-write to be dynamic

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

export class DatepickerPage {
    selectCommonDatepickerDateFromToday(numberOfDaysFromToday) {
        cy.get('[placeholder="Form Picker"]').then(input => {
            // cy.contains('nb-card', 'Common Datepicker').find('input').then(input => { // OR
            cy.wrap(input).click()
            let dateAssert = selectDateFromCurrentDay(numberOfDaysFromToday)
            cy.wrap(input).should('have.value', dateAssert)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        })
    }

    selectRangeDatepickerFromToday(numberOfDaysFromTodayStart, numberOfDaysFromTodayEnd) {
        cy.get('[placeholder="Range Picker"]').then(input => {
            // cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssertStart = selectDateFromCurrentDay(numberOfDaysFromTodayStart)
            const dateToAssertEnd = selectDateFromCurrentDay(numberOfDaysFromTodayEnd)
            const finalDate = `${dateToAssertStart} - ${dateToAssertEnd}`
            // const finalDate = dateAssertFirst + ' - ' + dateAssertSecond // page object lecture #49
            cy.wrap(input).should('have.value', finalDate)
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
        })
    }
}

export const onDatepickerPage = new DatepickerPage()
