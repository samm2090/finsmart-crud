import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getUsernameControl() {
    return element(by.name("txtUsername"));
  }

  getPasswordControl() {
    return element(by.name("txtPassword"));
  }

  getLoginButtonControl() {
    return element(by.name("btnLogin"));
  }

  getSnackBar() {
    return element(by.css('.mat-simple-snackbar')).element(by.tagName('span'));
  }
}
