import { browser, by, element } from 'protractor';

export class CreateUserPage {
  navigateTo() {
    return browser.get("/create-user") as Promise<any>;
  }

}
