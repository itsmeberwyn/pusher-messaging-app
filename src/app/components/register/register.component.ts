import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  currentUser!: string;
  currentId!: number;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  create() {
    sessionStorage.setItem('currentUser', this.currentUser);
    sessionStorage.setItem('currentId', this.currentId.toString());

    this.router.navigate(['/message']);
  }
}
