import { browser, logging, protractor } from 'protractor';
import { LoginPage } from './login.po';
import { CreateUserPage } from './create.po';

describe('workspace-project App', () => {
  let loginPage = new LoginPage();
  let createPage = new CreateUserPage();

  beforeEach(() => {
    // loginPage = new LoginPage();
    // createPage = new CreateUserPage();
  });

  it('should display wrong credentials', () => {
    loginPage.navigateTo();
    loginPage.getUsernameControl().sendKeys('abc');
    loginPage.getPasswordControl().sendKeys('abc');
    loginPage.getLoginButtonControl().click();
    const EC = protractor.ExpectedConditions;

    const snackbar = loginPage.getSnackBar();
    browser.wait(EC.visibilityOf(snackbar), 5000);
    snackbar.getText().then((val) => {
      expect(val).toEqual('Wrong credentials');
    });
  });

  it('should validate fields ', () => {
    createPage.navigateTo();
    const txtUsername = createPage.getUsernameControl();
    const txtPassword = createPage.getPasswordControl();
    const txtEmail = createPage.getEmailControl();
    const btnCreate = createPage.getCreateButton();

    txtUsername.click();
    browser.sleep(500);
    txtEmail.click();
    browser.sleep(500);
    txtPassword.click();
    browser.sleep(500);

    browser.actions().mouseMove(txtPassword, { x: 100, y: 100 }).click().perform();
    browser.sleep(500);
    const EC = protractor.ExpectedConditions;
    browser.actions().mouseMove(btnCreate).perform();
    browser.sleep(500);

    btnCreate.click().then(() => {
      const snackBar = createPage.getSnackBar();
      browser.wait(EC.presenceOf(snackBar), 5000);

      snackBar.getText().then((val) => {
        expect(val).toEqual('Complete all the required fields');

        expect(txtUsername.getAttribute('class')).toContain('ng-invalid');
        expect(txtEmail.getAttribute('class')).toContain('ng-invalid');
        expect(txtPassword.getAttribute('class')).toContain('ng-invalid');
      });
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
