import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserProfileService} from "../../services/user-profile.service";
import {AccessCodeService} from "../../services/access-code.service";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ToastrService} from "ngx-toastr";
import {LoadingComponent} from "../../shared/components/loading/loading.component";



@Component({
  selector: 'app-access-code',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatFormField,
    MatInput,
    LoadingComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './access-code.component.html',
  styleUrl: './access-code.component.scss'
})
export class AccessCodeComponent implements OnInit ,OnDestroy{
  accessCode: string | null = null;
  errorMessage: string | null = null;
  isAdmin: boolean = false;
  loading: boolean = false;
  private userDetailsService = inject(UserProfileService);
  private accessCodeService = inject(AccessCodeService);
  private toastr = inject (ToastrService);
  private subscription: Subscription;
  readonly dialogRef = inject(MatDialogRef);
  private  fb = inject(FormBuilder)


  adminCodeForm = this.fb.group({
    adminCode: [null, Validators.required]
  });


  constructor() {
    this.subscription = new Subscription();
  }
  ngOnInit(): void {

    this.loading = true;
    this.subscription.add(
      this.userDetailsService.getAccessCode((accessCode) => {
        this.accessCode = accessCode;
        console.log(accessCode);
        this.loading = false;
      })
    );
    this.subscription.add(
      this.userDetailsService.getUserRole((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    );
  }

  submitAdminCode() {
    const adminCode: any = this.adminCodeForm.get('adminCode')?.value;
    const uid = localStorage.getItem('uid');
    if (adminCode && uid) {
      this.subscription.add(
        this.accessCodeService.addAdminAccessCode(uid, adminCode).subscribe({
          next: response => {
            console.log('Response:', response);
            this.toastr.success('Admin access code added successfully');
            this.dialogRef.close();
            this.errorMessage = null;
          },
          error: err => {
            console.error('Error:', err);
            this.toastr.error('There was a problem adding the admin access code');
            this.errorMessage = `Error: ${err.message}`;
          }
        })
      );
    } else {
      this.errorMessage = "Admin code is required";
      this.toastr.error(this.errorMessage);
      console.error('Error:', this.errorMessage);
    }
  }
  removeAccessCode() {
    const uid = localStorage.getItem('uid');
    let accessCode = this.accessCode
    this.accessCodeService.deleteAccessCode(accessCode, uid);
    this.accessCode=null;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
