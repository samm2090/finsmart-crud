import { Component, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from './../../components/edit-dialog/edit-dialog.component';

import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  users: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['username', 'password', 'actions'];
  resultsLength = 0;

  constructor(private snackBar: MatSnackBar,
    private userService: UserService,
    private matDialog: MatDialog,
    private auth: AuthService,
  private router: Router) {
    this.userService.findAll().subscribe((resp: any) => {
      this.users = resp;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  edit(user: User) {
    this.matDialog.open(EditDialogComponent, {
      width: '300px',
      height: '250px',
      data: user
    }).afterClosed().subscribe((result) => {
      const index = this.users.indexOf(user);
      if (~index) {
        this.users[index] = result;
      }
      this.dataSource.data = this.users;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  delete(user: User) {
    this.userService.delete(user.id).subscribe(() => {
      this.users = this.users.filter((u) => {
        return u.id !== user.id;
      });
      this.dataSource.data = this.users;

      this.snackBar.open("User deleted", '', { duration: 1000 });
    });
  }

}
