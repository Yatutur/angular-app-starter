import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister: FormGroup;
  errorCode: string | undefined;
  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.formRegister = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ]),
      password: new FormControl('' , [
        Validators.required,
        Validators.minLength(8)
      ]),
      passwordRepeat: new FormControl('' , [
        Validators.required,
        Validators.minLength(8)
      ])
    },{
      validators:this.passwordMatchingValidator('password', 'passwordRepeat')
    });

  }

  onSubmit() {
    this.userService.register(this.formRegister.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => this.errorCode = error.code);
  }

  private passwordMatchingValidator(newPassword: any, confirmPassword: any) {
    return (formGroup : FormGroup) => {
      const passwordControl = formGroup.controls[newPassword];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (passwordControl.errors
        && confirmPasswordControl.errors !== null
        && !confirmPasswordControl.errors['passwordMatchingValidator']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({passwordMatchingValidator : true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  };
}
