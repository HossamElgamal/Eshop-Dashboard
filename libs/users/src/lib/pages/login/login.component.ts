import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmitted = false
  authError = false
  authMessage = 'Email Or Password Are Incorrect!'

  loginFormGroup!: FormGroup

  constructor(
    private formBulider: FormBuilder,
    private auth: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginForm()
  }


  private _initLoginForm() {
    this.loginFormGroup = this.formBulider.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    this.isSubmitted = true
    if (this.loginFormGroup.invalid) {
      return

    } else {
      const loginData = {
        email: this.loginForm.email.value,
        password: this.loginForm.password.value
      }
      this.auth.login(loginData.email, loginData.password).subscribe(user => {
        console.log(user)
        this.authError = false
        this.localStorageService.setToken(user.token)
        this.router.navigate(['/']);
      }, (err: HttpErrorResponse) => {

        console.log(err)
        this.authError = true
        if (err.status !== 400) {
          this.authMessage = "Error in the Server , please try again later  "
        }

      })
    }


  }

  get loginForm() {
    return this.loginFormGroup.controls
  }

}
