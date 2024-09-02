import {Component, OnDestroy, } from '@angular/core';
import {AdminDashboardComponent} from "../../dashboard/admin-dashboard/admin-dashboard.component";
import {UserDashboardComponent} from "../../dashboard/user-dashboard/user-dashboard.component";
import {ButtonCardComponent} from "../../../shared/components/button-card/button-card.component";
import {
    UserBusinessProfileComponent
} from "../../account/business-profile/user-business-profile/user-business-profile.component";
import {Subscription} from "rxjs";

import {UserProfileService} from "../../../services/user-profile.service";
import {TitleComponent} from "../../../shared/components/title/title.component";
import {ComingSoonComponent} from "../../../shared/components/coming-soon/coming-soon.component";
import { SplashScreenComponent } from "../../../shared/components/splash-screen/splash-screen.component";

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
    imports: [
    AdminDashboardComponent,
    UserDashboardComponent,
    ButtonCardComponent,
    UserBusinessProfileComponent,
    TitleComponent,
    ComingSoonComponent,
    SplashScreenComponent
],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent implements  OnDestroy {
  title: string='';
  description =[  {desc:"Monitor health of your business "},
    {desc:"Let's check your business health and get you a roadmap for success! How would you like to get started? "},];

  isAdmin: boolean = false;
  private role: Subscription;

  constructor(private userRoleService: UserProfileService) {
    this.role = this.userRoleService.getUserRole((isAdmin) => {
      this.isAdmin = isAdmin;
      if(isAdmin){
        this.title = 'Admin Dashboard';
        this.description=[  {desc:`The admin dashboard is a comprehensive tool designed to help you monitor the health of your business and manage users efficiently. It provides a real-time overview of key performance indicators (KPIs) and other critical metrics, enabling you to make informed decisions and ensure the smooth operation of your business.`},]
      }
      else {
        this.title = 'User Dashboard';
      }
    });

  }
  ngOnDestroy() {
    this.role.unsubscribe();

    this.userRoleService.destroy();
  }

}
