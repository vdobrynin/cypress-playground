const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://playground.bondaracademy.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 2065,
  viewportHeight: 1329,
  // defaultCommandTimeout: 11000 // for every test which not recommend
});
