import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private url = "https://finsmart-6b798.firebaseio.com/";

  create(user: User) {
    const endpoint = "users.json";

    return this.http.post(this.url + endpoint, user);
  }

  update(user: User) {
    const endpoint = "users/" + user.id + ".json";
    return this.http.put(this.url + endpoint, user);
  }

  findOne(id: number) {
    // const endpoint =

    // return this.http.get<Client>(this.url +  id);
  }

  findAll(): Observable<User[]> {
    const endpoint = "users.json";
    return this.http.get<User[]>(this.url + endpoint).pipe(map(this.createArray));
  }

  delete(id: string) {
    const endpoint = "users/" + id + ".json";
    return this.http.delete(this.url + endpoint);
  }

  private createArray(obj: object) {
    const users: User[] = [];

    if (obj) {
      Object.keys(obj).forEach(key => {
        const user: User = obj[key];
        user.id = key;
        users.push(user);
      });
    }

    return users;
  }

}
