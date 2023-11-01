import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserAuthService } from "../services/user.auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  private errorCode: string | undefined;
  private errorMessage: string | undefined;

  constructor(private userService: UserAuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  onSubmit() {
    this.userService.loginByEmailAndPassword(this.loginForm.value)
      .then(userCredential => {
        // console.log(userCredential);
        // console.log("userCredential.user=" + user);
        this.router.navigate(['']);
        //const user = userCredential.user;
      })
      .catch(error => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
        console.log(this.errorCode + " " + this.errorMessage);
      });
  }
}
