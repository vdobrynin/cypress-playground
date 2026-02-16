
function selectGroupMenuItem(groupItemName) { // --> creating the function to expand menu or not
    cy.contains('a', groupItemName).invoke('attr', 'aria-expanded').then(attr => {
        if (attr.includes('false')) {
            cy.contains('a', groupItemName).click()
        }
    })
    // --> 2nd variant to expand menu or not by using 'chevron'
    // cy.contains('a', groupItemName).then(menu => {
    //     cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
    //         if (attr.includes('chevron-left')) {
    //             cy.wrap(menu).click({ force: true })
    //         }
    //     })
    // })
}

class NavigationPage {
    formLayoutsPage() {
        // cy.contains('Forms').click()
        selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click()
    }

    datepickerPage() {
        // cy.contains('Forms').click() //--> after we wrote the condition above
        selectGroupMenuItem('Forms')
        // cy.wait(500)            //--> we fix it above - conditional object function 'selectGroupMenuItem'
        cy.contains('Datepicker').click()
    }

    toastrPage() {
        // cy.contains('Modal & Overlays').click()
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    tooltipPage() {
        // cy.contains('Modal & Overlays').click()
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}

export const navigateTo = new NavigationPage()