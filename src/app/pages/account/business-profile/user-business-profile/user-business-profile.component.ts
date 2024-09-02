import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { TEXT_FIELDS } from "../../../../shared/static/business-profile/business-profile-form-values";
import {
  BUSINESS_STAGE,
  PRODUCT_SERVICE,
  TARGET_MARKET,
  TYPE_OF_BUSINESS_REGISTRATION
} from '../../../../shared/static/business-profile/business-profile-static';
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { TitleComponent } from "../../../../shared/components/title/title.component";
import { IndustryListService } from "../../../../services/industry-list.service";
import { catchError, of, Subject, Subscription } from "rxjs";
import { SharedService } from "../../../../services/shared.service";
import { ToastrService } from "ngx-toastr";
import { UserProfileService } from "../../../../services/user-profile.service";
import { Router } from "@angular/router";
import { DistributionChannel, Industry, SubIndustry } from "../../../../models/industry";

@Component({
  selector: 'app-user-business-profile',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, LoadingComponent, TitleComponent],
  templateUrl: './user-business-profile.component.html',
  styleUrls: ['./user-business-profile.component.scss']
})
export class UserBusinessProfileComponent implements OnInit, OnDestroy {

  @Output() onboardedStatusChanged = new EventEmitter<boolean>();
  private subscription: Subscription = new Subscription();

  title: string = 'Create Business Profile';
  description = [
    { desc: "To get started, tell us about your business " },
    { desc: "Let's check your business health and get you a roadmap for success! How would you like to get started? " },
  ];
  isLoading: boolean = true;
  industryList: Industry[] = [];
  subIndustryList: { id: string; name: string }[] = [];
  distributionChannels: DistributionChannel[] = [];


  email: string | null = null;
  isOnboarded: boolean = false;

  private toastr = inject(ToastrService);
  private sharedService = inject(SharedService);
  private industryListService = inject(IndustryListService);
  private userDetailsService = inject(UserProfileService);
  private router = inject(Router);

  constructor(private fb: FormBuilder){
    this.subscription.add(
      this.userDetailsService.getUserEmail((email) => {
        this.email = email;
        this.businessProfileForm.controls['email'].setValue(this.email);
        console.log(this.email);
      })
    );
    this.subscription.add(
      this.userDetailsService.getIsUserOnboarded((onboarded) => {
        this.isOnboarded = onboarded;
        console.log(this.isOnboarded, "isOnboarded");
        this.onboardedStatusChanged.emit(onboarded);
      })
    );
  }

  protected businessProfileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    businessName: new FormControl('', [Validators.required]),
    businessStage: new FormControl(null, [Validators.required]),
    businessRegistrationType:  new FormControl(null, [Validators.required]),
    industry: new FormControl(null, [Validators.required]),
    subIndustry: new FormControl(null, [Validators.required]),
    offerType:  new FormControl(null, [Validators.required]),
    distributionChannel:  new FormControl(null, [Validators.required]),
    targetMarket: new FormControl(null, [Validators.required]),
    uid: new FormControl(''),
  });

  protected readonly TEXT_FIELDS = TEXT_FIELDS;
  protected readonly BUSINESS_STAGE = BUSINESS_STAGE;
  protected readonly TYPE_OF_BUSINESS_REGISTRATION = TYPE_OF_BUSINESS_REGISTRATION;
  protected readonly TARGET_MARKET = TARGET_MARKET;
  protected readonly PRODUCT_SERVICE = PRODUCT_SERVICE;

  ngOnInit() {
    // Fetch industries and sub-industries
    this.industryListService.getIndustryAndSubIndustryList().subscribe(
      (industryList: Industry[]) => {
        this.industryList = industryList;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching industry list:', error);
        this.isLoading = false;
        // Handle error appropriately
      }
    );

    // Fetch distribution channels
    this.industryListService.getDistributionList().subscribe(
      (distributionList: DistributionChannel[]) => {
        this.distributionChannels = distributionList;
      },
      (error) => {
        console.error('Error fetching distribution list:', error);
        // Handle error appropriately
      }
    );
  }

  onIndustrySelect(selectedIndustry: any) {
    // Clear subIndustryList and update based on selected industry
    if (selectedIndustry) {
      this.subIndustryList = selectedIndustry.subIndustries.map((sub: { subIndustryId: any; subIndustryName: any; }) => ({
        id: sub.subIndustryId,
        name: sub.subIndustryName
      }));



      console.log('Industry List:', this.industryList);
      console.log('Form Control Value:', this.businessProfileForm.controls['industry'].value);

      // Clear subIndustry FormControl
      this.businessProfileForm.controls['subIndustry'].setValue(null);
    } else {
      this.subIndustryList = [];
      this.businessProfileForm.controls['subIndustry'].setValue(null);
    }
  }

  onSubIndustrySelect(selectedSubIndustry: any) {
    // Set the selected subIndustry
    if (selectedSubIndustry) {
      this.businessProfileForm.controls['subIndustry'].setValue(selectedSubIndustry);
    }
  }



  trackByFn(index: number, item: any) {
    return item.id || index;
  }

  createBusinessProfile() {
    if (this.businessProfileForm.valid) {
      this.sharedService.loading().subscribe(() => {
        this.businessProfileForm.value.uid = localStorage.getItem("uid");
        this.subscription.add(
          this.industryListService.createBusinessProfile(this.businessProfileForm.value)
            .pipe(
              catchError((error: any) => {
                console.error(error);
                return of(null);
              })
            )
            .subscribe((response: any) => {
              if (response) {
                this.toastr.success(
                  "Profile created successfully", "", { positionClass: "toast-top-center" }
                );
                console.log('Business profile created successfully:', response);

                // Now update local storage onboarded status with response
                if (response.user && (typeof response.user.onboarded !== 'undefined')) {
                  localStorage.setItem('onboarded', response.user.onboarded.toString());
                }
                // Fetch updated user data
                this.subscription.add(
                  this.userDetailsService.getIsUserOnboarded((onboarded) => {
                    this.isOnboarded = onboarded;
                    this.onboardedStatusChanged.emit(onboarded);
                  })
                );
                this.router.navigate(['app/dashboard']);
                // Reset the form
                this.businessProfileForm.reset();
              } else {
                console.error('Got response but not expected user data');
              }
            })
        );
      });
    } else {
      console.error('Form is invalid');
    }
  }

  serializeChoice(choice: any): string {
    return JSON.stringify({ id: choice.id || choice.industryId || choice.channelId, name: choice.name || choice.industryName || choice.channelName });
  }

  deserializeChoice(value: string): { id: string, name: string } {
    return JSON.parse(value);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
    this.subscription.unsubscribe();
    this.userDetailsService.destroy();
  }
}
