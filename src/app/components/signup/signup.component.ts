import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  user: any={};

  constructor(private formBuilder: FormBuilder,private userService:UserService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required, Validators.pattern('[0-9]{8}')]],
    });
  }

  isInvalid(controlName: string) {
    const control = this.signupForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMsg(fieldName: string) {
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
  isFormValid() {
    const { firstName, lastName, email, tel } = this.signupForm.controls;
    return firstName.valid && lastName.valid && email.valid && tel.valid;
}

  signup() {
    this.user = this.signupForm.value
    console.log(this.user);
this.userService.sendEmail(this.user).subscribe((response)=>{
  console.log("response",response);
  
})
  }



}
