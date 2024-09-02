import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {AdminAccountComponent} from "../../account/accounts/admin-account/admin-account.component";
import {UserAccountComponent} from "../../account/accounts/user-account/user-account.component";
import {GetUserDataService} from "../../../services/get-user-data.service";
import {Subject, Subscription, takeUntil} from "rxjs";

@Component({
  selector: 'app-account-container',
  standalone: true,
  imports: [
    AdminAccountComponent,
    UserAccountComponent
  ],
  templateUrl: './account-container.component.html',
  styleUrl: './account-container.component.scss'
})
export class AccountContainerComponent implements OnInit, OnDestroy {

  userRole: string | null = null;
  private destroy$ = new Subject<void>()
  private userAccountService = inject(GetUserDataService);

  ngOnInit(): void {
   this.getUserRole();
  }

  getUserRole(): Subscription {
    return this.userAccountService.getUserRole().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: role => {
        this.userRole = role;
        console.log(this.userRole);
      },
      error: err => {
        console.error('Error fetching user role:', err);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
