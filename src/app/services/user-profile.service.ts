import {inject, Injectable} from '@angular/core';
import { GetUserDataService } from './get-user-data.service'; // Update the path as needed
import {Subscription, Subject, Observable} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";


/**
 * Service for managing user profile data.
 * @class
 * @implements {OnDestroy}
 */
@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private destroy$ = new Subject<void>();
  private userAccountService = inject(GetUserDataService);
  private authService = inject(AuthService);
  protected router = inject(Router);
  constructor() {}


  getUserData(setUserData: (data: any)=>void): Subscription {
    return this.userAccountService.getUserData().pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (userData) => {
      setUserData(userData);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        if (err.status === 401) {
         console.error(err.message);
        }
      },
    });
  }

  getUserRole(setAdminStatus: (isAdmin: boolean) => void): Subscription {
    return this.userAccountService.getUserRole().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (role) => {
        const isAdmin = role === 'admin';
        setAdminStatus(isAdmin);
      },
      error: (err) => {
        if (err.status === 401) {
          this.authService.logOut();
        }
          else{
          setAdminStatus(false);
            console.error('Error fetching user role:', err);
        }

      }
    });
  }
  getProfilePicture(setProfilePicture:(url:string | null)=> void): Subscription {
    return this.userAccountService.getProfilePicture().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (url) => {
        setProfilePicture(url);
      },
      error: (err) => {
        console.error('Error fetching profile picture:', err);
        setProfilePicture(null);
      }
    })
  }

  getIsUserOnboarded(setIsUserOnboarded: (onboarded: boolean) => void): Subscription {
    return this.userAccountService.getIsUserOnboarded().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (onboarded) => {
        const isOnboarded = onboarded === true;
        setIsUserOnboarded(isOnboarded);
      },
      error: (err) => {
        console.error('Error fetching isUserOnboarded', err);
        setIsUserOnboarded(false);
      }
    });
  }

  getAccessCode(setAccessCode:(accessCode:string | null)=> void): Subscription {
    return this.userAccountService.getAccessCode().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next:(accessCode: string | null) => {
        setAccessCode(accessCode);
      }
    })
  }

  getUserName(setUserName:(name: string | null)=>void):Subscription {
    return this.userAccountService.getUserName().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (name) => {
        setUserName(name);
      },
      error: (err) => {
        console.error('Error fetching user name:', err);
        setUserName(null);
      }
    })
  }

  getUserLastName(setLastName:(lastName: string | null)=>void):Subscription {
    return this.userAccountService.getUserLastName().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (name) => {
        setLastName(name);
      },
      error: (err) => {
        console.error('Error fetching user last name:', err);
        setLastName(null);
      }
    })
  }
  /**
   * Retrieves the user's email from the user account service and sets the email using the provided setUserEmail callback function.
   *
   * @param {function} setUserEmail - The callback function used to set the user's email.
   * @param {string | null} email - The user's email.
   * @param {string | null} uid - The user's uid.
   * @return {Subscription} - The subscription object.
   */
  getUserEmail(setUserEmail:(email: string | null)=>void):Subscription {
    return this.userAccountService.getUserEmail().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (email) => {
        setUserEmail(email);
      },
      error: (err) => {
        console.error('Error fetching user email:', err);
        setUserEmail(null);
      }
    })
  }

  getUserUID(setUserUID:(uid: string | null)=>void):Subscription {
    return this.userAccountService.getUserUID().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (uid) => {
        setUserUID(uid);
      },
      error: (err) => {
        console.error('Error fetching user email:', err);
        setUserUID(null);
      }
    })
  }

  // Call this method from component's ngOnDestroy lifecycle hook
  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
