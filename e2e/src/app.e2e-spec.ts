import { browser, logging, protractor } from 'protractor';
import { LoginPage } from './login.po';
import { CreateUserPage } from './create.po';

describe('workspace-project App', () => {
  let loginPage: LoginPage;
  let createPage : CreateUserPage;

  beforeEach(() => {
    // loginPage = new LoginPage();
  });

  it('should display wrong credentials', () => {
    loginPage.navigateTo();
    loginPage.getUsernameControl().sendKeys('abc');
    loginPage.getPasswordControl().sendKeys('abc');
    loginPage.getLoginButtonControl().click();
    const EC = protractor.ExpectedConditions;

    const snackbar = loginPage.getSnackBar();
    browser.wait(EC.visibilityOf(snackbar), 10000);
    snackbar.getText().then((val) => {
      expect(val).toEqual('Wrong credentials');
    });
  });

  it('it should  ', () => {
    loginPage.navigateTo();
    loginPage.getUsernameControl().sendKeys('abc');
    loginPage.getPasswordControl().sendKeys('abc');
    loginPage.getLoginButtonControl().click();
    const EC = protractor.ExpectedConditions;

    const snackbar = loginPage.getSnackBar();
    browser.wait(EC.visibilityOf(snackbar), 10000);
    snackbar.getText().then((val) => {
      expect(val).toEqual('Wrong credentials');
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
