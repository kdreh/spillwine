import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AlertsComponent } from "../../../shared/components/alerts/alerts.component";
import { MaterialModule } from "../../../shared/modules/material/material.module";
import { SIGN_IN_FIELDS } from "../../../shared/static/auth/auth-form";
import { BackComponent } from "../../../shared/components/back/back.component";
import { AUTH_IMAGE, LOGO } from "../../../shared/static/static-files";
import { AuthService } from "../../../services/auth.service"; // Import AuthService
import { ToastrService } from "ngx-toastr"; // Import ToastrService for notifications

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MaterialModule,
    AlertsComponent, ReactiveFormsModule, BackComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../../../styles/auth.scss'] // Fixed typo: changed 'styleUrl' to 'styleUrls'
})
export class ForgotPasswordComponent {
  /**
   * Represents the title, logo and image alt text of the sign-in page.
   * @type {string}
   */
  public title: string = 'Forgot Password';
  subText: string[] = [
    'We Will Help You Reset your Password',
    'Remembered your Password?',
  ];
  public logo: string = LOGO;
  public altText: string = 'logo';
  // !TODO Please change this url to actual image
  public signInImage: string = AUTH_IMAGE;

  // Create formGroup
  protected forgotPasswordForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  protected readonly SIGN_IN_FIELDS = SIGN_IN_FIELDS;

  constructor(
    private authService: AuthService, // Inject AuthService
    private toastr: ToastrService // Inject ToastrService
  ) {}

  forgotPassword(): void {
    if (this.forgotPasswordForm?.valid) {
      const email = this.forgotPasswordForm.get('email')!.value as string;

      this.authService.forgotPassword(email).subscribe(
        () => {
          this.toastr.success('Password reset link sent successfully', '', {positionClass: 'toast-top-center'});
        },
        (err: any) => {
          this.toastr.error('Failed to send password reset link', 'Error', {positionClass: 'toast-top-center'});
          console.error(err);
        }
      );
    } else {
      this.toastr.error('Please enter a valid email address', 'Error', {positionClass: 'toast-top-center'});
    }
  }
}
