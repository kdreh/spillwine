import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {UploadComponent} from "../upload/upload.component";
import {AccessCodeComponent} from "../../../tools/access-code/access-code.component";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {UserProfileService} from "../../../services/user-profile.service";
import {NgIf} from "@angular/common";
import {LoadingComponent} from "../loading/loading.component";
import {AccessCodeService} from "../../../services/access-code.service";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReloadComponent} from "../reload/reload.component";
@Component({
  selector: 'app-dashboard-buttons',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    RouterLink,
    UploadComponent,
    NgIf,
    LoadingComponent,
    MatFormField,
    MatInput, MatLabel, MatIconButton, MatHint, ReloadComponent
  ],
  templateUrl: './dashboard-buttons.component.html',
  styleUrl: './dashboard-buttons.component.scss'
})
export class DashboardButtonsComponent  implements  OnDestroy, OnInit{
  readonly dialog = inject(MatDialog);
  private  subscription: Subscription;
  private userDetailsService = inject(UserProfileService);
  private accessCodeService = inject(AccessCodeService);

  isAdmin :boolean = false;
  accessCode : string |null = null;
  errorMessage: string | null = null;

  constructor() {
    this.subscription = new Subscription();
  }

  loadRoles ():void{
    this.subscription.add(
      this.userDetailsService.getUserRole(role =>{
        this.isAdmin = role;
      })
    );
  }
  generateCode() {
    const uid = localStorage.getItem('uid');
    if (uid) {
      this.accessCodeService.generateAccessCode(uid).subscribe({
        next: response => {
          // console.log('Response:', response);
          this.accessCode = response.accessCode;
          this.errorMessage = null;
        },
        error: err => {
          console.error('Error:', err);
          this.errorMessage = `Error: ${err.message}`;
          this.accessCode = null;
        }
      });
    } else {
      this.errorMessage = "No user id found in the session storage";
      console.error('Error:', this.errorMessage);
    }
  }

  loadAccessCode ():void{
    this.subscription.add(
      this.userDetailsService.getAccessCode(accessCode => {
        this.accessCode = accessCode;
      })
    );
  }
  removeAccessCode() {
    const uid = localStorage.getItem('uid');
    let accessCode = this.accessCode
    this.accessCodeService.deleteAccessCode(accessCode, uid);
    this.accessCode = null
  }

  copyToClipboard(value: string) {
    this.accessCodeService.copyToClipboard(value);
  }

  shareViaEmail(accessCode: string | null) {
    if(accessCode){
      this.accessCodeService.shareViaEmail(accessCode);
    }else {
      console.error("Access Code is null not not valid");
    }
  }

  reloadPage(){
    window.location.reload();
  }

  ngOnInit() {
  this.loadAccessCode();
  this.loadRoles();
  }

  openAccessCode(){
    this.dialog.open(AccessCodeComponent);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

