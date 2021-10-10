export const getMainApp = () => cy.get('.main-app');
export const getAppBar = () => getMainApp().get('.app-bar');
export const getMainAppContainer = () => cy.get('.main-app-container');
export const getButtons = () => getMainAppContainer().get('.home-buttons');
export const getDogButton = () => getMainAppContainer().find('.home-buttons button').eq(0);
export const getCatButton = () => getMainAppContainer().find('.home-buttons button').eq(1);

export const getByHook = (name) => cy.get(`[data-hook="${name}"]`);

export const shouldHaveAppBar = () => {
  context('should have app bar', () => {
    getMainApp().should('be.visible');
    getAppBar().should('be.visible');
  });
};

export const shouldHaveHomePage = () => {
  shouldHaveAppBar();
  getMainApp().should('be.visible');
  getAppBar().should('be.visible');
  getMainAppContainer().should('be.visible');
  getButtons().should('be.visible');
  getButtons().children().should('have.length', 2);
  getDogButton().should('be.visible');
  getCatButton().should('be.visible');
};
