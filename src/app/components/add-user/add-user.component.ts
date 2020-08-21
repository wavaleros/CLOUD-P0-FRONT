import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import Swal from 'sweetalert2';
import * as Paths from '../../app.paths';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  username: string;

  constructor(public router: Router, public userService: UsersService) {
  }

  ngOnInit(): void {
  }

  createUser(): void {
    const userData = {
      username: this.username,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email
    };
    this.userService.createUser(userData).subscribe(
      data => {
        Swal.fire('User creation', 'User creation successful', 'success').then(r => this.router.navigateByUrl(Paths.EVENT_LIST));
      },
      err => {

        const message = '<p style="justify-content: left">' + JSON.stringify(err.error.message)
          .split('{').join('')
          .split('}').join('')
          .split('"').join('')
          .split('[').join('')
          .split(']').join('')
          .split(',').join('<br>') + '</p>';

        Swal.fire('User creation', message, 'error');
      });
  }

  redirectToLogin(): any {
    this.router.navigateByUrl(Paths.LOGIN).then();
  }
}
