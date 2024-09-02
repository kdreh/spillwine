import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { AlertsComponent } from "../../../shared/components/alerts/alerts.component";
import { MaterialModule } from "../../../shared/modules/material/material.module";
import { SIGN_IN_FIELDS } from "../../../shared/static/auth/auth-form";
import { BackComponent } from "../../../shared/components/back/back.component";
import { AUTH_IMAGE, LOGO } from "../../../shared/static/static-files";
import { AuthService } from "../../../services/auth.service"; // Import AuthService
import { ToastrService } from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router"; // Import ToastrService for notifications

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MaterialModule,
    AlertsComponent,
    ReactiveFormsModule,
    BackComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../../../styles/auth.scss'] // Fixed typo: changed 'styleUrl' to 'styleUrls'
})
export class ResetPasswordComponent {
  /**
   * Represents the title, logo, and image alt text of the reset password page.
   * @type {string}
   */
  public title: string = 'Reset Password';
  subText: string[] = [
    'We Will Help You Reset Your Password',
    'Remembered your Password?',
  ];
  isLoading: boolean | undefined;
  public logo: string = LOGO;
  public altText: string = 'logo';
  // !TODO Please change this URL to the actual image
  public signInImage: string = AUTH_IMAGE; // Update to reset password image if available

  resetPasswordForm: FormGroup;
  token: any | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')!.value;
      const confirmPassword = this.resetPasswordForm.get('confirmPassword')!.value;

      if (newPassword !== confirmPassword) {
        this.toastr.error('Passwords do not match','',{positionClass: 'toast-top-center'});
        return;
      }

      this.isLoading = true;
      console.log(this.token)
      this.authService.resetPassword(this.token, newPassword).subscribe(
        () => {
          this.toastr.success('Password reset successfully', '', {positionClass: 'toast-top-center'});
          setTimeout(() => this.router.navigate(['/sign-in']), 2000);
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error('Failed to reset password', 'Error', {positionClass: 'toast-top-center'});
          console.error(error);
          this.isLoading = false;
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly');
    }
  }
}
