/// <reference types="cypress" />

import { navigateTo } from "../page-objects/navigationPage"
import { onFormLayoutsPage } from "../page-objects/formLayoutsPage"
import { onDatepickerPage } from "../page-objects/datepickerPage"

beforeEach('open application', () => {
    cy.openHomePage()                       // custom command at command.js
    // cy.visit('/')
})

it.only('navigation test', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.tooltipPage()
    navigateTo.toastrPage()
})

it('test with page object', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitUsingTheGridForm('test@test.com', 'Welcome', 1)
    // onFormLayoutsPage.submitBasicForm('artem@test.com', 'Welcome', true) // checkbox is check & submit both
    onFormLayoutsPage.submitBasicForm('artem@test.com', 'Welcome', false) // checkbox not checked & but submit 
    // navigateTo.datepickerPage()
    // onDatepickerPage.selectCommonDatepickerDateFromToday(5)
    // onDatepickerPage.selectRangeDatepickerFromToday(10, 50)
})