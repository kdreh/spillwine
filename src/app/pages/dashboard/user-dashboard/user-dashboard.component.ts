import {ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatFabAnchor, MatFabButton, MatIconButton, MatMiniFabAnchor} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {CardComponent} from "../../../shared/components/card/card.component";
import {SplashScreenComponent} from "../../../shared/components/splash-screen/splash-screen.component";
import {NoDataComponent} from "../../../shared/components/no-data/no-data.component";
import {UploadComponent} from "../../../shared/components/upload/upload.component";
import {AccessCodeComponent} from "../../../tools/access-code/access-code.component";

import {ComingSoonComponent} from "../../../shared/components/coming-soon/coming-soon.component";
import {MatCard} from "@angular/material/card";
import {Subscription, tap} from "rxjs";
import {UserProfileService} from "../../../services/user-profile.service";
import {AccessCodeService} from "../../../services/access-code.service";
import {DocumentSourceService} from "../../../services/document-source.service";
import {NgIf} from "@angular/common";
import {MatFooterRow} from "@angular/material/table";
import {DashboardButtonsComponent} from "../../../shared/components/dasboard-buttons/dashboard-buttons.component";
import {User} from "../../../models/users";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton,
    RouterLink,
    CardComponent,
    SplashScreenComponent,
    NoDataComponent,
    UploadComponent,
    AccessCodeComponent,
    ComingSoonComponent,
    MatCard,
    NgIf,
    MatFooterRow,
    MatAnchor,
    MatFabAnchor,
    MatMiniFabAnchor,
    MatIconButton,
    DashboardButtonsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit, OnDestroy{
  @Input() userName: string | undefined;

  title ="Dashboard"
  isLoading: boolean = true; // Initialize isLoading to true
  isEmpty: boolean | undefined;
  thumb : string | undefined;
  color: string | undefined;
  colorGreen : string | undefined;
  score: any[] | undefined;
  userScore : any[]=[]; // TODO assign score data from backend

  rateStrategy: string | undefined;
  rateOperations: string | undefined;
  rateMarketing: string | undefined;
  rateTeam: string | undefined;

  accessCode: string | null=null;

  entrepreneurs:any[]=[];
  userProfile:any[]=[];
  totalUserDocs: number | undefined;


  private router = inject(Router);
  private userDetailsService = inject(UserProfileService);
  private accessCodeService = inject(AccessCodeService);
  private documentSourceService = inject( DocumentSourceService);
  private  subscription: Subscription;
  uid : string | null = null;
  firstName:string | null = null;
  todosCount: number | null = null;

  constructor() {
    this.subscription = new Subscription();
  }


  ngOnInit() {
    // Assign values to userScore
    this.assignValues();
    this.checkIfEmpty();
    this.assignThumbsUp();
    this.loadUserDataFromLocalStorage()
    this.getUserProfileInfo();

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  getUserProfileInfo():void{
    this.userDetailsService.getUserData(data => {
      this.userProfile = data;
      this.saveUserDataToLocalStorage()
    });
  }

  saveUserDataToLocalStorage() {
    localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
  }

  loadUserDataFromLocalStorage() {
    const userProfile = localStorage.getItem('userProfile');
    const userDocs = localStorage.getItem('docs');
    const userTodos = localStorage.getItem('todos');

    if(userProfile ) {
      const parsedProfile:User = JSON.parse(userProfile);
      this.firstName = parsedProfile.firstName;
      console.log("Parsed:", parsedProfile);
    }

    if(userDocs){
      const parsedDocs =JSON.parse(userDocs);
      this.totalUserDocs = parsedDocs.length;
    }

    if(userTodos){
      const parsedTodos = JSON.parse(userTodos);
      this.todosCount = parsedTodos.length;
    }
  }

  assignValues() {
    // TODO: Replace with real data
    this.userScore = [{ strategy: 28, operations: 53, marketing: 53, team: 63.4 }];
    this.isEmpty = this.userScore.length === 0;
    // TODO! this should be replaced by real data
    this.userScore = [{strategy: 28, operations: 53, marketing: 53, team: 63.4}];

    // Check if userScore is empty or null
    if (this.isEmpty) {
      // If empty, create a default object with all values set to 0
      this.userScore = [{
        strategy: 0,
        operations: 0,
        marketing: 0,
        team: 0
      }];
    }
  }


  checkIfEmpty() {
    this.isEmpty = this.userScore.length === 0;
  }

  assignThumbsUp() {
    this.thumb = this.userScore.length > 0 ? '👍' : '👎';
  }
}
