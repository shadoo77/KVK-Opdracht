import {
  getMainAppContainer, shouldHaveAppBar, shouldHaveHomePage, getDogButton, getCatButton
} from '../../helpers/helpers';

const get404Page = () => getMainAppContainer().get('.wrong-page');

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render home page', () => {
    shouldHaveHomePage();
  });

  it('Should render 404 page', () => {
    cy.visit('/not-exist');
    shouldHaveAppBar();
    get404Page().should('be.visible');
  });

  it('Should navigate to dog page', () => {
    getDogButton().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.equal('/dog');
    });
  });

  it('Should navigate to cat page', () => {
    getCatButton().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.equal('/cat');
    });
  });
});
