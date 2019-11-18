import { Directive } from '@angular/core';
// import {NG_ASYNC_VALIDATORS} from '@angular/common';
//
@Directive({
  selector: '[emailValidator]',
  // providers:  provide(NG_ASYNC_VALIDATORS, {
  //     useExisting: EmailValidator, multi: true
  //   }),
})
export class EmailvalidatorDirective {

  constructor() { }

}
