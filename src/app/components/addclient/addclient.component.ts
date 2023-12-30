import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent {
  addClientForm: FormGroup;
  client: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router,) {
    this.addClientForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.email]],
      tel1: ["", [Validators.required, Validators.pattern('[0-9]{8}')]],
      tel2: ["", [Validators.pattern('[0-9]{8}')]],
    });


  }

  isInvalid(controlName: string) {
    const control = this.addClientForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMsg(fieldName: string) {
    const field = this.addClientForm.get(fieldName);
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
    if (field?.errors?.['maxLength']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must have at max 12 characters`;
    }
    return '';
  }

  isBasicInfoValid() {
    const { firstName, lastName, tel1 } = this.addClientForm.controls;
    return firstName.valid && lastName.valid && tel1.valid;
  }

  addClient() {
    this.client = this.addClientForm.value
    console.log(this.client);
    alert('add success')
  }



}
