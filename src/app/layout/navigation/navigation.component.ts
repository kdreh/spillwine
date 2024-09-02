import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';

import {Observable, Subject, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MaterialModule} from "../../shared/modules/material/material.module";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ADMIN_ROUTES, APP_ROUTES, TOP_NAV_ROUTES, USER_ROUTES} from "./routes";
import {AuthService} from "../../services/auth.service";
import {UserProfileService} from "../../services/user-profile.service";
import {ChatGptComponent} from "../../features/chat-gpt/chat-gpt.component";
import {ReloadComponent} from "../../shared/components/reload/reload.component";



@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
    imports: [
        MaterialModule,
        AsyncPipe,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        ChatGptComponent,
        ReloadComponent,
    ]
})
export class NavigationComponent implements OnDestroy , OnInit{
  // inject
  authService = inject(AuthService);
  isAdmin: boolean | null = null;
  isOnboarded: boolean | null = null;
  profilePicture: string | null = null;
  firstName: string | null = null;
  email: string | null = null;
  private destroy$ = new Subject<void>()
  public isChatOpen = false;

  protected  routes = inject(Router);
  // routes
  protected readonly ADMIN_ROUTES = ADMIN_ROUTES;
  protected readonly TOP_NAV_ROUTES = TOP_NAV_ROUTES;
  protected readonly APP_ROUTES = APP_ROUTES;
  protected readonly USER_ROUTES = USER_ROUTES;
  // responsiveness
  private breakpointObserver = inject(BreakpointObserver);

  private subscription: Subscription;
  private userDetailsService = inject(UserProfileService);


  constructor( ) {

    this.subscription = new Subscription();
    this.subscription.add(
      this.userDetailsService.getUserRole((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    );
    this.subscription.add(
      this.userDetailsService.getProfilePicture((url) => {
        this.profilePicture = url;
      })
    );
    this.subscription.add(
      this.userDetailsService.getUserName((name)=>{
        this.firstName = name;
      })
    );

    if(localStorage.getItem('dialog')){
      this.openChat()
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userDetailsService.destroy();
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  signOut() {
    this.authService.logOut();
    this.routes.navigate(['/sign-in']);
  }
  openChat(): void {
    this.isChatOpen = true;
    localStorage.setItem('isChatOpen', 'true');
  }

  closeChat(): void {
    this.isChatOpen = false;
    localStorage.setItem('isChatOpen', 'false');
  }

  ngOnInit(): void {
    const chatState = localStorage.getItem('isChatOpen');
    this.isChatOpen = chatState === 'true';
  }


}
