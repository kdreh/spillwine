import {Component, inject} from '@angular/core';
import {AlertsComponent} from "../../../shared/components/alerts/alerts.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AUTH_IMAGE, LOGO} from "../../../shared/static/static-files";
import {
  SIGN_UP_PERSONAL_FIELDS,
  ROLE_DROPDOWN_FIELDS,
  IMAGE_UPLOAD,
  SIGN_UP_ADDRESS_FIELDS,
  CONTACT_FIELDS, PASSWORD_FIELDS
} from '../../../shared/static/auth/auth-form';
import { USER_TYPE } from '../../../shared/static/auth/user-type';
import {MaterialModule} from "../../../shared/modules/material/material.module";
import {US_STATES} from "../../../shared/static/auth/us-states";
import {LoadingComponent} from "../../../shared/components/loading/loading.component";
import {SharedService} from "../../../services/shared.service";
import {BackComponent} from "../../../shared/components/back/back.component";
import { ToastrService } from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
import {catchError, of} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {FileUploadService} from "../../../services/file-upload.service";



const pattern ='^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
const zipPatter =/^\d{5}$/;
@Component({
  selector: 'app-sign-up',
  standalone: true,
  providers: [
    provideAnimations(), // required animations providers

  ],
  imports: [
    AlertsComponent,
    MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    LoadingComponent,
    BackComponent,

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: '../../../../styles/auth.scss'
})
export class SignUpComponent {
  /**
   * Represents the title, logo and image alt text of the sign-in page.
   * @type {string}
   */
  public title: string = 'Registration'
  public logo: string = LOGO;
  public altText: string = 'logo';
  // !TODO Please change this url to actual image
  public signInImage: string = AUTH_IMAGE;
  isLoading: boolean = true; //when user clicks button to sign in, the loading screen shows

  private sharedService = inject(SharedService);
  private authService = inject(AuthService);
  private fileUploadService = inject(FileUploadService);
  private toastr= inject(ToastrService);
  protected  route = inject(Router);
  profileImageName:string ='';
  imageSrc = '/image/default_picture.png';

  selectedFile: File | null = null;
  uploadUrl: string | null = null;

  constructor() {}

  protected personalInfoForm = new FormGroup({
    profilePic: new FormControl(''),
    firstName: new FormControl('', [Validators.required,Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required,Validators.minLength(3)]),
  });
  protected contactInfoForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.minLength(3)]),
    phoneNumber: new FormControl(''),
  });
  protected addressInfoForm = new FormGroup({
    address: new FormControl('', [Validators.required,Validators.minLength(3)]),
    address2: new FormControl(''),
    cityName: new FormControl('', [Validators.required,Validators.minLength(3)]),
    stateName: new FormControl('', [Validators.required,Validators.minLength(3)]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern(zipPatter),Validators.maxLength(5)]),
  });
  protected passwordInfoForm = new FormGroup({
    role: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(pattern)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(pattern)]),


  });
  protected signUpForm = new FormGroup({
    profilePic: new FormControl( ''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.minLength(3)]),
    phoneNumber: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    address2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.pattern(zipPatter)]),
    role: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(pattern)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(pattern)]),

  });


  imageUploadOnFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Check if file size exceeds the limit of 5MB
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error(
          "File size exceeds the limit of 5MB. Please choose a smaller file.",
          "",
          { positionClass: "toast-top-center" }
        );
      } else {
        // Update file name
        this.profileImageName = file.name;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Update image source
          this.imageSrc = e.target.result as string;

          // Optionally update the form control with the base64 string (only for preview purposes)
          this.signUpForm.patchValue({
            profilePic: this.imageSrc
          });

          // Call the uploadFile method from authService
          this.fileUploadService.profilePicUpload(file).subscribe({
            next: (res: any) => {
              this.uploadUrl = res.url;
              console.log(this.uploadUrl,"successful profilePicUpload");

              // Update the form control with the Blob Storage URL
              this.signUpForm.patchValue({
                profilePic: this.uploadUrl
              });
            },
            error: (err: any) => {
              console.error('Could not upload:', err);
            }
          });
        };

        // Read the file as a data URL for preview (not needed for upload)
        reader.readAsDataURL(file);
      }
    }
  }

  isPasswordMatch():boolean{
    const password =  this.signUpForm.controls['password'].value;
    const confirmPassword =  this.signUpForm.controls['confirmPassword'].value;
    return password !== '' && password !== null && password === confirmPassword;
  }

  preprocessSignUpForm(data:any){
    let signUpFormData = {...data};
    delete signUpFormData['confirmPassword'];
    return signUpFormData;
  }

  isSubmitDisabled = false;

  onCheckboxChange(event:any) {
    this.isSubmitDisabled = !event.target.checked;
  }

  public signUp(): void {
    if(!this.isPasswordMatch()) {
      this.logError('No password match!');
      return;
    }
    if(this.signUpForm.invalid){
      this.logError('Form invalid');
      return;
    }
    const user= this.preprocessSignUpForm(this.signUpForm.value);
    this.sharedService.loading().subscribe(()=>{
      this.authService.createUserAccount(user)
        .pipe(
          catchError((error: any) => {
            // Handle error and return an observable so the stream can continue
            console.error(error);
            return of(null);
          })
        )
        .subscribe((response: any) => {
          if(response) {
           // Extract the email from the form data and send verification email
            const email = user.email;
            if(!this.isPasswordMatch()){
              this.toastr.error("Password need to be the same.", "Error", { positionClass: "toast-top-center" });
            }
            this.authService.sendVerificationEmail(email).subscribe(
              () => {
                this.toastr.success(
                  "Verification email sent!", "", { positionClass: "toast-top-center" }
                );
              },
              (err) => {
                this.toastr.error("Failed to send verification email.", "Error", { positionClass: "toast-top-center" });
                console.error(err);
              }
            );

            this.signUpForm.reset();
            this.route.navigate(['/email-confirmation']);
          }
        });
    });
    this.isLoading=false;
    console.log(user);
  }
  clearFormData(){
    this.signUpForm.reset();
  }

  logError(error:any):void{
    console.error(error);
  }


  protected readonly SIGN_UP_PERSONAL_FIELDS = SIGN_UP_PERSONAL_FIELDS;
  protected readonly ROLE_DROPDOWN_FIELDS = ROLE_DROPDOWN_FIELDS;
  protected readonly USER_TYPE = USER_TYPE;
  protected readonly IMAGE_UPLOAD = IMAGE_UPLOAD;
  protected readonly SIGN_UP_ADDRESS_FIELDS = SIGN_UP_ADDRESS_FIELDS;
  protected readonly US_STATES = US_STATES;
  protected readonly CONTACT_FIELDS = CONTACT_FIELDS;
  protected readonly PASSWORD_FIELDS = PASSWORD_FIELDS;
}
