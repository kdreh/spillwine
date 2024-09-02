import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserProfileService } from "../../services/user-profile.service";
import { AccessCodeService } from "../../services/access-code.service";
import { DocumentSourceService } from "../../services/document-source.service";
import { Subscription } from "rxjs";
import {tap} from "rxjs/operators";
import {DatePipe, NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {SplashScreenComponent} from "../../shared/components/splash-screen/splash-screen.component";
import {BackComponent} from "../../shared/components/back/back.component";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatAnchor, MatFabButton} from "@angular/material/button";
import {MatChipOption} from "@angular/material/chips";
import {NoDataComponent} from "../../shared/components/no-data/no-data.component";
import {MatLine} from "@angular/material/core";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  imports: [
    SlicePipe,
    DatePipe,
    NgIf,
    NgForOf,
    NgClass,
    SplashScreenComponent,
    BackComponent,
    MatList,
    MatListSubheaderCssMatStyler,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatCard,
    MatCardHeader,
    MatCardContent, MatCardTitle, MatAnchor, MatFabButton, MatChipOption, NoDataComponent, MatLine, MatListItem, MatDivider
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private userDetailsService = inject(UserProfileService);
  private accessCodeService = inject(AccessCodeService);
  private documentSourceService = inject(DocumentSourceService);
  private subscription: Subscription;
  private subscriptions = new Subscription();
  private router = inject(Router);
  accessCode: string | null = null;
  errorMessage: string | null = null;
  isAdmin: boolean = false;
  entrepreneur: any = null;
  readonly panelOpenState = signal(false);
  constructor() {
    this.subscription = new Subscription();
  }

  viewProfile(uid: string): void {
    this.router.navigate(['/profile', uid]);
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');  // Retrieve the ID from route parameters
        if (id) {
          // Fetch the access code
          this.userDetailsService.getAccessCode(accessCode => {
            if (accessCode) {
              this.accessCode = accessCode;

              // Fetch users associated with the access code
              this.accessCodeService.getUsersByAccessCode(this.accessCode)
                .subscribe(response => {
                  console.log('API Response:', response);

                  // Ensure 'response.users' is an array before using 'find'
                  if (response && Array.isArray(response.users)) {
                    this.entrepreneur = response.users.find((user: { uid: string; }) => user.uid === id);
                    if (!this.entrepreneur) {
                      this.errorMessage = 'User not found';
                    } else {
                      // Log the entrepreneur object for debugging
                      console.log(this.entrepreneur, "Entrepreneur");
                    }
                  } else {
                    this.errorMessage = 'Unexpected API response format';
                  }
                });
            } else {
              this.errorMessage = 'Access code not found';
            }
          });
        } else {
          this.errorMessage = 'ID not found in route';
        }
      })
    );
  }
getFileName(url: string): string {
  const fileName = url.split('/').pop() || url;
  return decodeURIComponent(fileName);
}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
