//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//material module
import { MaterialModule } from './material.module';

//routes
import { AppRoutes } from './../routes';

//components
import { LoginComponent } from './../components/login/login.component';
import { UserListComponent } from './../components/user-list/user-list.component';
import { CreateUserComponent } from './../components/create-user/create-user.component';
import { UsersComponent } from '../components/users/users.component';
import { EditDialogComponent } from './../components/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserListComponent,
    CreateUserComponent,
    UsersComponent,
    EditDialogComponent
  ],
  entryComponents: [EditDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(AppRoutes),
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
