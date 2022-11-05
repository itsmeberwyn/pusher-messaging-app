import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: String = '';
  private id!: Number;

  constructor() {}

  // set currentUser(username: String) {
  //   this.username = username;
  // }
  get currentUser() {
    return sessionStorage.getItem('currentUser');
  }

  // set currentId(id: Number) {
  //   this.id = id;
  // }
  get currentId() {
    return sessionStorage.getItem('currentId');
  }
}
