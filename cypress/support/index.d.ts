declare namespace Cypress {  // --> #51 custom commands
    interface Chainable {
        /**
         * Command to open home page of this application
         */
        openHomePage(): Chainable<void>
    }
}
