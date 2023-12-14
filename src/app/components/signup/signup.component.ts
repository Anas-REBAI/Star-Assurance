import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  user: any = {};
  pwdUser: any = {};
  path: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private activateRoute: ActivatedRoute) {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required, Validators.pattern('[0-9]{8}')]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPwd: ["", [Validators.required]],
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
    if (field?.errors?.['maxLength']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must have at max 12 characters`;
    }
    return '';
  }

  isPasswordConfirmed(): boolean {
    return this.signupForm.get('pwd')?.value === this.signupForm.get('confirmPwd')?.value;
  }

  isBasicInfoValid() {
    const { firstName, lastName, email, tel } = this.signupForm.controls;
    return firstName.valid && lastName.valid && email.valid && tel.valid;
  }
  isFormPwdValid() {
    const { pwd, confirmPwd } = this.signupForm.controls;
    return pwd.valid && confirmPwd.valid;
  }

  signup() {
    this.user = this.signupForm.value
    console.log(this.user);
    this.userService.signup(this.user).subscribe((response) => {
      console.log("Here response from B.E :", response.message);

    })
  }
  pathDetected(): Boolean {
    this.path = this.router.url;
    return this.path == "/signup"
  }
  createPwd() {
    let activationToken = this.activateRoute.snapshot.paramMap.get("activationToken");

    this.pwdUser.pwd = this.signupForm.get('pwd')?.value
    this.pwdUser.activationToken = activationToken


    this.userService.signup(this.pwdUser).subscribe((response) => {
      console.log("Response from the backend:", response.message);
      alert("Backend Response: " + response.message);
      // Traiter la réponse ici, si nécessaire
    },
    (error) => {
      console.error("Error occurred:", error);
      if (error && error.error && error.error.error) {
        // Afficher l'erreur dans une alerte
        alert("Backend Error: " + error.error.error);
      } else {
        // Si l'erreur n'est pas structurée comme attendu, afficher un message générique
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  );
    this.router.navigate([""]);

  }

  

}
