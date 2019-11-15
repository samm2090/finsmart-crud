import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  userForm = new FormGroup({
    id: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: User,
    private dialofRef: MatDialogRef<EditDialogComponent>,
    private uService: UserService,
    private snack: MatSnackBar) {
    this.userForm.setValue({
      id: this.data.id,
      username: this.data.username,
      password: this.data.password
    });
  }

  editUser() {
    const user = new User(this.userForm.controls['username'].value, this.userForm.controls['password'].value);
    user.id = this.userForm.controls['id'].value;

    this.uService.update(user).subscribe((resp: any) => {

      if(resp){
        // window.location.reload();
        this.dialofRef.close(user);
        this.snack.open("User updated", "", { duration: 2000 });
      }else{
        this.snack.open("An error occurred", "", { duration: 2000 });
      }

    });
  }



}
