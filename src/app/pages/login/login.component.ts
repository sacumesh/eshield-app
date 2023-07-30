import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Credentials } from '../../models/credentials';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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
    email: '',
    password: '',
  };

  constructor(private _authenticationService: AuthenticationService, private _router: Router) {}

  async login() {
    const booleanObservable = this._authenticationService.login(
      this.credentials
    );
    try {
      const res = await lastValueFrom(booleanObservable);
      if (res) {
        this._router.navigate(['/pages/courses']);
      }

    } catch (e) {
      console.error(e);
    }
  }
}
