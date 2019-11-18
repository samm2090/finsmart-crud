import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private userService: UserService) { }

  login(loginUser: User): Observable<User> {
    return new Observable(observer => {
      this.userService.findAll().subscribe((resp) => {
        observer.next(resp.find((user) => {
          if (user.username == loginUser.username && user.password == loginUser.password){
            localStorage.setItem('token', '123456');
            return true;
          }
          return false;
        }));
      });
    });
  }

  logout(){
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
}
