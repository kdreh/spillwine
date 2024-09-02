import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MarketingComponent } from "../../assessments/questions/marketing/marketing.component";
import { StrategyComponent } from "../../assessments/questions/strategy/strategy.component";
import { OperationComponent } from "../../assessments/questions/operation/operation.component";
import { TeamComponent } from "../../assessments/questions/team/team.component";
import { RouterLink } from "@angular/router";
import { ButtonCardComponent } from "../../../../shared/components/button-card/button-card.component";
import { NgClass } from "@angular/common";
import { UserBusinessProfileComponent } from "../../../../pages/account/business-profile/user-business-profile/user-business-profile.component";
import { TitleComponent } from "../../../../shared/components/title/title.component";
import { UserProfileService } from "../../../../services/user-profile.service";
import { Subject, Subscription } from "rxjs";
import {SplashScreenComponent} from "../../../../shared/components/splash-screen/splash-screen.component";

@Component({
  selector: 'app-assessment-container',
  standalone: true,
  imports: [
    MarketingComponent,
    StrategyComponent,
    OperationComponent,
    TeamComponent,
    RouterLink,
    ButtonCardComponent,
    NgClass,
    UserBusinessProfileComponent,
    TitleComponent,
    SplashScreenComponent,
  ],
  templateUrl: './assessment-container.component.html',
  styleUrls: ['./assessment-container.component.scss']
})
export class AssessmentContainerComponent implements OnInit, OnDestroy {

  isAdmin: boolean | null = null;
  isOnboarded: boolean  = false;
  private subscription: Subscription;
  private destroy$ = new Subject<void>();
  private userDetailsService = inject(UserProfileService);

  title = "Assessment Types";
  description = [
    { desc: "To get started, tell us about your business " },
    { desc: "Let's check your business health and get you a roadmap for success! How would you like to get started? " },
  ];
  links = [
    { linkUrl: '/app/strategy-assessment', linkName: 'Strategy Assessment', bgColor: 'logo-purple', color: '' },
    { linkUrl: '/app/marketing-assessment', linkName: 'Marketing Assessment', bgColor: 'logo-blue', color: '' },
    { linkUrl: '/app/operation-assessment', linkName: 'Operation Assessment', bgColor: 'logo-green', color: '' },
    { linkUrl: '/app/team-assessment', linkName: 'Team Assessment', bgColor: 'logo-light', color: '' }
  ];

  constructor() {
    this.subscription = new Subscription();

    this.subscription.add(
      this.userDetailsService.getUserRole((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    );
  }

  onOnboardedStatusChanged(onboarded: boolean) {
    console.log('Received onboarded status:', onboarded);
    this.isOnboarded = onboarded;
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userDetailsService.destroy();
  }
}
