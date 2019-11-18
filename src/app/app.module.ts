//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

//components
import { AppComponent } from './app.component';

//services
import { UserService } from './services/user.service';
import { EmailvalidatorDirective } from './directives/emailvalidator.directive';


@NgModule({
  declarations: [
    AppComponent,
    EmailvalidatorDirective,
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
