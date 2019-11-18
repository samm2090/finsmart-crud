import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  loading: boolean;

  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required], this.validateEmail.bind(this))
    });
  }

  create() {
    this.loading = true;
    if (this.userForm.valid) {
      let user = new User(this.userForm.controls['username'].value,
        this.userForm.controls['password'].value);
      user.email = this.userForm.controls['email'].value;

      this.userService.create(user).subscribe((resp: any) => {
        let message = 'User created with id: ' + resp.name;

        this.snackBar.open(message, 'Close', { duration: 4000 }).afterDismissed().subscribe(() => {
          this.router.navigate(['/login']);
        });

        this.loading = false;
      });
    } else {
      this.snackBar.open("Complete all the required fields", 'Close', { duration: 2000 });
    }
  }

  validateEmail(control: AbstractControl): { [key: string]: any } | null {
    return new Promise(resolve => {
      this.userService.findAll().subscribe((resp) => {
        for (let user of resp) {
          if (user.email === control.value) {
            resolve({ emailTaken: true });
          }
          resolve(null);
        }
      });
    });
  }

}
