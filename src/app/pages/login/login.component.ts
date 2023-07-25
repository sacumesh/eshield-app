import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showMessages: any;
  user: any;
  submitted: any;
  messages: any;
  errors: any;

  form = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService
  ) {}

  login() {
    this._authenticationService
      .login({
        username: 'sachiththa',
        password: 'test',
      })
      .subscribe();
  }

  getConfigValue(required: string) {
    return undefined;
  }
}
