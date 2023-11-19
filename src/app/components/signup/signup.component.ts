import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      tel: ["", [Validators.required, Validators.pattern('[0-9]{8}')]],

    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMsg(fieldName: string): string {
    const field = this.signupForm.get(fieldName);

    if (field?.errors?.['required']) {
      return 'This field is required';
    }
    if (field?.errors?.['email']) {
      return 'Invalid email format';
    }
    if (field?.errors?.['minlength']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must have at least 3 characters`;
    }
    if (field?.errors?.['pattern']) {
      return 'Invalid format';
    }
    return '';
  }
  signup() {

  }



}
