import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Credentials } from '../../models/credentials';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showMessages: any;
  submitted: any;
  messages: any;
  errors: any;

  credentials: Credentials = {
    email: 'sac',
    password: 'sacume3@gmail.com',
  };

  constructor(private _authenticationService: AuthenticationService) {}

  async login() {
    const booleanObservable = this._authenticationService.login(
      this.credentials
    );
    try {
      await lastValueFrom(booleanObservable);
    } catch (e) {
      console.error(e);
    }
  }
}
