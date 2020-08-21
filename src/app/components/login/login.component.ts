import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthenticationService} from '../../services/authentication-service.service';
import * as Paths from '../../app.paths';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(public  usersService: AuthenticationService, public router: Router) {
  }

  login(): void {
    const user = {username: this.username, password: this.password};
    this.usersService.login(user).subscribe(() => {
      this.router.navigateByUrl(Paths.EVENT_LIST).then();
    }, () => {
      Swal.fire('Error on authentication', 'Is not possible to logon', 'error').then();
    });
  }

  ngOnInit(): void {
  }


}
