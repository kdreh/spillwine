import {Component, inject, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {UserProfileService} from "../../../services/user-profile.service";
import {AccessCodeService} from "../../../services/access-code.service";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  @Input() user: any; // input user
  private subscription: Subscription;

  accessCode : string | null = null;
  entrepreneurs :any []= []

  private userDetailsService = inject(UserProfileService);
  private accessCodeService = inject(AccessCodeService);

  constructor() {
    this.subscription = new Subscription();
  }
  ngOnInit() {
    this.subscription.add(
      this.userDetailsService.getAccessCode((accessCode) => {
        this.accessCode = accessCode;
        console.log(accessCode);
        this.accessCodeService.getUsersByAccessCode(this.accessCode)
          .subscribe((response) => {
            this.entrepreneurs = response.users;
            console.log("User Details Component",this.entrepreneurs);
          })
      })
    );
  }


}
