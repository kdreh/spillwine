import {Component, inject} from '@angular/core';
import {BackComponent} from "../../../shared/components/back/back.component";
import {AUTH_IMAGE, LOGO} from "../../../shared/static/static-files";
import {MaterialModule} from "../../../shared/modules/material/material.module";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [
    MaterialModule,
    BackComponent,
    RouterLink
  ],
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['../../../../styles/auth.scss']
})
export class EmailConfirmationComponent {
  /**
   * Represents the title, logo and image alt text of the sign-in page.
   * @type {string}
   */
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  public title: string = 'Email Confirmation';
  subText: string[] = [
    'To start using Sustainable, we need to verify your email<br/>',
    'Please check the email and click on the ' + '<b><a href="/">click here</a> </b> to verify your email address.',
    '<h6>If you did not get an email, please click to resend.</h6>'
  ];
  public logo: string = LOGO;
  public altText: string = 'logo';
  // !TODO Please change this url to actual image
  public signInImage: string = AUTH_IMAGE;


  resendEmail() {
    const email = localStorage.getItem('email');
    console.log("Email Confirmation", email);
    if (!email) {
      this.toastr.error('Email address is required to resend the verification email.', '', { positionClass: 'toast-top-center' });
      return;
    }

    this.authService.resendVerificationEmail(email).subscribe(
      () => {
        this.toastr.success('Verification email resent successfully.', '', { positionClass: 'toast-top-center' });
      },
      (err) => {
        this.toastr.error('Failed to resend verification email.', 'Error', { positionClass: 'toast-top-center' });
        console.error(err);
      }
    );
  }
}
