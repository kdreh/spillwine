import {Component, inject} from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MaterialModule} from '../../../shared/modules/material/material.module';
import {Router, RouterLink} from "@angular/router";
import {ROLE_DROPDOWN_FIELDS, SIGN_IN_FIELDS} from "../../../shared/static/auth/auth-form";
import {USER_TYPE} from "../../../shared/static/auth/user-type";
import {AlertsComponent} from "../../../shared/components/alerts/alerts.component";
import {AUTH_IMAGE, LOGO} from "../../../shared/static/static-files";
import {LoadingComponent} from "../../../shared/components/loading/loading.component";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../services/auth.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-sign-in',
  standalone: true,
    imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterLink, AlertsComponent, LoadingComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: '../../../../styles/auth.scss'
})
export class SignInComponent {
  /**
   * Represents the title, logo and image alt text of the sign-in page.
   * @type {string}
   */
  public title: string = 'Sign In'
  public logo: string = LOGO;
  public altText: string = 'logo';
  // !TODO Please change this url to actual image
  public signInImage: string = AUTH_IMAGE;
  isLoading: boolean = true; //when user clicks button to sign in, the loading screen shows

  protected  route= inject(Router);
  private authService = inject(AuthService);

  private toastr = inject(ToastrService);
  protected readonly SIGN_IN_FIELDS = SIGN_IN_FIELDS;
  protected readonly ROLE_DROPDOWN_FIELDS = ROLE_DROPDOWN_FIELDS;
  protected readonly USER_TYPE = USER_TYPE;
  //? service injections maybe better to use these in constructor as parameters


  /**
   * Represents a sign-in form.
   * @constructor
   * @param {object} formGroup - The FormGroup object containing email and password FormControls.
   * @param {FormControl} formGroup.email - The FormControl for user email.
   * @param {FormControl} formGroup.password - The FormControl for user password.
   */
  protected signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    // password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    role: new FormControl('', [Validators.required]),
  });


public signIn(){
  try{
    if(this.signInForm?.valid){
      const {email, password   , role} = this.signInForm.value;
      this.authService.signIn({email, password, role})
        .subscribe(response =>{
          console.log(response);
          this.route.navigate(['/app/dashboard']);
          })
    }
    else{
     console.error('Invalid form data')
    }
  }
  catch (error){
    throw error;
    }
  }
}
