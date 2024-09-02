import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {NgStyle} from "@angular/common";
import {SignInComponent} from "./authentication/pages/sign-in/sign-in.component";
import {ToastrModule} from "ngx-toastr";
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, NgStyle, SignInComponent,  ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnInit {
  title = 'pages';
  private  authService = inject(AuthService);
  isAuthenticated:boolean = false;


  ngOnInit() {
  this.checkAuthentication();

    console.log(localStorage.getItem('onboarded'));
  this.authService.checkTokenAndSignOut()
    }
    checkAuthentication(){
    this.isAuthenticated = this.authService.isAuthenticated();
    }
  }
