import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required])
  });

  matcher = new MyErrorStateMatcher();

  loading: boolean;

  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.loading = false;
  }

  ngOnInit() {
  }

  create() {
    this.loading = true;
    let user = new User(this.userForm.controls['username'].value,
      this.userForm.controls['password'].value);

    this.userService.create(user).subscribe((resp: any) => {
      let message = 'User created with id: ' + resp.name;

      this.snackBar.open(message, 'Close', { duration: 4000 }).afterDismissed().subscribe(() => {
        this.router.navigate(['/login']);
      });

      this.loading = false;
    });
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
