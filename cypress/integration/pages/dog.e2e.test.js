import { shouldHaveAppBar } from '../../helpers/helpers';

const getPageTitle = () => cy.get('.page-title');
const getSearchArea = () => cy.get('.search');
const getAnimalRender = () => cy.get('.animale-render');

const getSearchOptions = () => getSearchArea()
  .get('div.MuiFormGroup-root .search-options');

const getSearchSubmitButton = () => getSearchArea()
  .get('div.submit-button-wrapper');

const getSearchBoxArea = () => getSearchOptions()
  .get('div.search-options-box .search-options-radio-group');
const getSelectArea = () => getSearchOptions()
  .get('div.search-options-select .search-options-radio-group');

const getSelectRadioButton = () => cy.get('input#radio-button-for-select');
const getSearchBoxRadioButton = () => cy.get('input#radio-button-for-search-box');

const getSearchBox = () => getSearchBoxArea().find('div input');
const getDropdownSelect = () => cy.get('input#select-animale-dropdown');

const getDropdownListClick = () => getSelectArea().get('div.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root');

const getDropdownList = () => getDropdownListClick().get('ul');

const getSecondItem = () => getDropdownList().find('li').eq(1);

const getImageContainer = () => cy.get('div.animale-render-image');

// animale-render-image

describe('Dog page', () => {
  beforeEach(() => {
    cy.visit('/dog');
  });

  it('Should render dog page', () => {
    shouldHaveAppBar();
    getPageTitle().should('be.visible');
    getPageTitle().contains('Dog page');
    getSearchArea().should('be.visible');
    getSearchOptions().should('be.visible');
    getSearchOptions().children().should('have.length', 2);
    getSearchSubmitButton().should('be.visible');
    getSearchBoxArea().should('be.visible');
    getSelectArea().should('be.visible');
    getAnimalRender().should('be.visible');
    getSelectRadioButton().should('exist');
    getSearchBoxRadioButton().should('exist');
    getSelectRadioButton().should('be.not.checked').and('have.value', 'select');
    getSearchBoxRadioButton().should('be.checked').and('have.value', 'type');
    getSearchBox().should('be.visible');
    getDropdownSelect().should('exist');
    getDropdownSelect().should('be.disabled');
  });

  it('Should not disable dropdown on click select radio', () => {
    getSelectRadioButton().check();
    getDropdownSelect().should('be.not.disabled');
    getSearchBox().should('be.disabled');
  });

  it('Should render dropdown list', () => {
    getSelectRadioButton().check();
    getDropdownListClick().should('be.visible').click();
    getDropdownList().should('be.visible');
    getDropdownList().children().should('have.length', 5);
  });

  context('Should select item and submit', () => {
    const dataValue = 'boxer';
    beforeEach(() => {
      const url = `https://dog.ceo/api/breed/${dataValue}/images/random`;
      cy.intercept('GET', url).as('getAnimal');
    });

    it('should get response status success', () => {
      getSelectRadioButton().check();
      getDropdownListClick().should('be.visible').click();
      getSecondItem().should('have.attr', 'data-value', dataValue);
      getSecondItem().click();
      getSearchSubmitButton().click();

      cy.wait('@getAnimal');
      cy.get('@getAnimal').should((res) => {
        expect(res.response.body.status).eq('success');
      });

      getImageContainer().should('be.visible');
      getImageContainer().get('img').should('be.visible');
    });
  });
});
