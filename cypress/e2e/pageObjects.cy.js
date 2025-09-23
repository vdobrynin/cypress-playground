/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"
// import { onDatepickerPage } from "../page-objects/datepickerPage"
// import { onFormLayoutsPage } from "../page-objects/formLayoutsPage"

beforeEach('open application', () => {
    cy.visit('/')
    // cy.openHomePage()
})

it('navigation test', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datePickerPage()
    navigateTo.tooltipPage()
    navigateTo.toastrPage()
})

// it.only('test with page object', () => {
//     navigateTo.formLayoutsPage()
    // onFormLayoutsPage.submitUsingTheGridForm('test@test.com', 'Welcome', 1)
    // onFormLayoutsPage.submitBasicForm('artem@test.com', 'Welcome', false)
    // navigateTo.datePickerPage()
    // onDatepickerPage.selectCommonDatepickerDateFromToday(5)
    // onDatepickerPage.selectRangePickerDateFromToday(10, 50)
// })