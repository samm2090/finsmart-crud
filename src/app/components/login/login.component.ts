import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  loading: boolean;

  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.loading = false;
  }

  login() {
    this.loading = true;

    const user = new User(this.userForm.controls['username'].value, this.userForm.controls['password'].value);

    this.userService.login(user).subscribe(resp => {
      if (resp) {
        this.router.navigate(["/users"]);
        this.snackBar.open("Logged in", "x",{duration: 1000});
      } else {
        this.snackBar.open("Wrong credentials", "x",{duration: 20000});
      }
      this.loading = false;
    });
  }


}
