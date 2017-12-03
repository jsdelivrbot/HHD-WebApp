import {Component, OnInit} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private googleAuth: GoogleAuthService,
              private authenticationApi: AuthenticationService) {}

  ngOnInit() {
  }

  signIn() {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => {
          const token = res.getAuthResponse().id_token;
          this.authenticationApi.signIn(token);
        });
      });
  }

}
