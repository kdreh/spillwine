import {Component, inject} from '@angular/core';
import {ButtonCardComponent} from "../../../../shared/components/button-card/button-card.component";
import {
  UserBusinessProfileComponent
} from "../../../../pages/account/business-profile/user-business-profile/user-business-profile.component";
import {Subject, Subscription} from "rxjs";
import {UserProfileService} from "../../../../services/user-profile.service";

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [
    ButtonCardComponent,
    UserBusinessProfileComponent
  ],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.scss'
})
export class ResultsContainerComponent {
  title ="Results";

  isOnboarded: boolean  = false;
  private subscription: Subscription;
  private destroy$ = new Subject<void>();
  private userDetailsService = inject(UserProfileService);

  description =[  {desc:"To get started, tell us about your business "},
    {desc:"Let's check your business health and get you a roadmap for success! How would you like to get started? "},];
  links =[
    {linkUrl: '/app/strategy-assessment', linkName: 'Strategy Assessment',bgColor:'logo-purple', color:''},
    {linkUrl: '/app/marketing-assessment', linkName: 'Marketing Assessment',bgColor:'logo-blue', color:''},
    {linkUrl: '/app/operation-assessment', linkName: 'Operation Assessment',bgColor:'logo-green', color:''},
    {linkUrl: '/app/team-assessment', linkName: 'Team Assessment',bgColor:'logo-light', color:''}
  ];

  constructor() {
    this.subscription = new Subscription();


  }
  onOnboardedStatusChanged(onboarded: boolean) {
    console.log('Received onboarded status:', onboarded);
    this.isOnboarded = onboarded;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userDetailsService.destroy();
  }
}
