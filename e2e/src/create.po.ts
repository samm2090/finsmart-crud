import { browser, by, element } from 'protractor';

export class CreateUserPage {
  navigateTo() {
    return browser.get("/create-user") as Promise<any>;
  }

  getUsernameControl() {
    return element(by.name('txtUsername2'));
  }

  getPasswordControl() {
    return element(by.name('txtPassword2'));
  }

  getEmailControl() {
    return element(by.name('txtEmail2'));
  }

  getCreateButton() {
    return element(by.name('btnCreate2'));
  }

  getSnackBar(){
    return element(by.css('.mat-simple-snackbar')).element(by.tagName('span'));
  }
}
