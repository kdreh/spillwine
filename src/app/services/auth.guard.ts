import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {UserProfileService} from "./user-profile.service";
import {map} from "rxjs/operators";
import {GetUserDataService} from "./get-user-data.service";
import {Subscription} from "rxjs";
import {flip} from "@popperjs/core";

/**
 * CanActivate function used for route guards to check if the user is authorized to access a certain route.
 * If the user is not logged in, it will navigate to the sign-in page.
 * @param {ActivatedRouteSnapshot} route - The ActivatedRouteSnapshot object representing the current route.
 * @returns {boolean} - Returns true if the user is logged in and can access the route, false otherwise.
 */
export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/sign-in']);
    return false;
  }if(!authService.isOnboarded()) {
    router.navigate(['app/business-profile']);
    return false;
  }
  return true;
}


/**
 * loginGuard is a CanActivateFn variable.
 *
 * This variable represents a guard used in Angular routing to control access to a specific route.
 * It is a function that takes an ActivatedRouteSnapshot as its parameter and returns a boolean value.
 * If the user is logged in, it redirects them to the '/app' route and returns false to prevent access.
 * If the user is not logged in, it allows access to the route by returning true.
 *
 * @param {ActivatedRouteSnapshot} route - The current route being activated.
 * @returns {boolean} - Whether the user should be allowed access to the route.
 */
export const loginGuard: CanActivateFn = (route:ActivatedRouteSnapshot) => {
  const authService= inject(AuthService);
  const router = inject(Router);
  const userAccountService = inject(GetUserDataService);
  if(authService.isLoggedIn() ){
    router.navigate(['/app'])
    return false;
  } else {

    return true;
  }
};

