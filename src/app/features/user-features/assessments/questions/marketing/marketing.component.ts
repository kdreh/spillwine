import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetUserDataService } from '../../../../../services/get-user-data.service';
import { BackComponent } from "../../../../../shared/components/back/back.component";
import { TitleComponent } from "../../../../../shared/components/title/title.component";
import { description } from "../../../../../shared/static/assessments/assessments-contents";
import { NgClass, NgIf } from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { salesStrategiesOvercomeNoneAbove,
  marketingStrategiesOvercomeNoneAbove,
  marketingBrand,
  marketingEffectiveness,
  marketingNetworkMaterial,
  marketingSocialMedia,
  marketingWebsite,
  customerEngagement,
  customerService,
  customerFeedback,
  marketingDomainEmail
} from '../../../../../shared/static/assessments/marketing'
import { IndustryListService } from "../../../../../services/industry-list.service";
import { MaterialModule } from "../../../../../shared/modules/material/material.module";
import {Router} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {Dropdowns} from "../../../../../shared/static/assessments/dropdown";
import {resetController} from "../../../../../shared/static/functions";
import {AssessmentService} from "../../../../../services/assessment.service";
import {marketing} from "./marketing";

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [
    BackComponent,
    TitleComponent,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent implements OnInit {

  // public userInformation = (): any => {
  //   return this.userDataService.userInformation()
  // };

  public B2B: boolean = false;
  public B2C: boolean = false;

  //Handle NoneAbove
  selectedOption: string[] = [];
  public industry: any;
  public targetMarket: any;
  public subindustryDetails: any;
  public userData: any;
  public marketForm!: FormGroup;
  //Handle ShowHide

  //Handle noneAbove
  public isNoneM1: boolean = false;
  public isNoneM2: boolean = false;

  @ViewChild('CustomerEngagement') customerEngagementQ!: ElementRef;
  @ViewChild('CustomerService') customerServiceQ!: ElementRef;
  @ViewChild('B2B') b2b!: ElementRef;
  @ViewChild('B2C') b2c!: ElementRef;


  //Splash Timer info
  timeoutAssessmentProcessingMarketing: any;
  textToShow: any;
  showSplash: boolean = false;
  time=15;
  submitted: boolean =false;
  public businessProfile: any; // Adjust type as needed

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userDataService: GetUserDataService,
    private assessmentService: AssessmentService,
    private industryListService: IndustryListService,
    // public matDialog: MatDialog,
    // public tooltip: MatTooltipModule,
    private router: Router,

  ) {

  }


  ngOnInit(): void {
    this.loadUserProfile().then(() => {
      this.handleAfterProfileLoad(); // Ensure this function runs after profile load
      this.market();
    }).catch(error => {
      console.error('Error loading user profile:', error);
    });
  }


  ngAfterViewInit(): void {
    //this.offerType = this.userInformation()?.offerType;
    this.handleProductServiceQuestions(this.offerType?.id)
  }

  market() {
    this.marketForm = this.fb.group({
      marketingWebsite: [null, Validators.required],
      marketingBrand: [null, Validators.required],
      marketingEffectiveness: [null, Validators.required],
      marketingNetworkMaterial: [null, Validators.required],
      marketingSocialMedia: [null, Validators.required],
      customerEngagement: [null, Validators.required],
      customerService: [null, Validators.required],
      marketingStrategiesOvercome: [null, Validators.required],
      salesStrategiesOvercome: [null, Validators.required],
      customerFeedback: [null, Validators.required],
      marketingDomainEmail: [null, Validators.required],
    });
  }

  marketingStrategiesOvercomeNoneAbove = marketingStrategiesOvercomeNoneAbove;
  salesStrategiesOvercomeNoneAbove = salesStrategiesOvercomeNoneAbove;
  marketingWebsite=marketingWebsite;
  marketingBrand=marketingBrand;
  marketingEffectiveness=marketingEffectiveness;
  marketingNetworkMaterial=marketingNetworkMaterial;
  marketingSocialMedia=marketingSocialMedia;
  customerEngagement=customerEngagement;
  customerService =customerService;
  customerFeedback=customerFeedback;
  marketingDomainEmail=marketingDomainEmail;

  /***Start Handle Data variables***/

  //Industry
  industryCategory: any;
  distributionDetails: any;
  offerType: any
  // by @leonkoech
  // created a permanent storage for dropdowns.
  // original should be used as final Value
  marketingStrategiesOvercomeFull: any[] = [];
  marketingStrategiesFull: any[] = [];
  marketingStrategies = this.marketingStrategiesFull;
  marketingStrategiesOvercome = this.marketingStrategiesOvercomeFull;

  salesStrategiesOvercomeFull: any[] = [];
  salesStrategiesFull: any = [];
  salesStrategies = this.salesStrategiesFull;
  salesStrategiesOvercome = this.salesStrategiesOvercomeFull;



  loadUserProfile(): Promise<void> {
    return new Promise((resolve, reject) => {
      const uid = localStorage.getItem('uid');
      if (!uid) {
        this.toastr.error('User ID not found. Please contact support.', 'Error');
        reject('User ID not found.');
        return;
      }

      this.userDataService.getUserBusinessProfile(uid).subscribe({
        next: (data) => {
          console.log('User Business Profile Data:', data);
          this.businessProfile = data; // Set the user business profile
          this.fetchIndustryAndDistribution(this.businessProfile); // Pass it to the fetch function
          resolve(); // Resolve the promise after fetching the data
        },
        error: (err) => {
          this.toastr.error('Failed to fetch profile details.', 'Error');
          console.error('Error fetching user profile data', err);
          reject(err); // Reject the promise in case of error
        }
      });
    });
  }


  private async handleAfterProfileLoad(): Promise<void> {
    try {
      debugger
      // Await the results from asynchronous methods
      const marketingResult = await this.handleDataFillersDropDown(this.marketingStrategiesFull, this.marketingStrategiesOvercomeFull, 'marketingStrategies');
      this.marketingStrategiesOvercomeFull = marketingResult.filler;
      const salesResult = await this.handleDataFillersDropDown(this.salesStrategiesFull, this.salesStrategiesOvercomeFull, 'salesStrategies');
      this.salesStrategiesOvercomeFull = salesResult.filler;

      console.log(this.marketingStrategiesFull + 'marketingStrategiesFull')
      console.log(this.marketingStrategiesOvercomeFull + 'marketingStrategiesOvercomeFull')
    } catch (error) {
      console.error('Error handling data fillers:', error);
    }
  }

  private async fetchIndustryAndDistribution(businessProfile: any): Promise<void> {
    try {
      if (businessProfile) {
        this.targetMarket = businessProfile.targetMarket;
        this.offerType = businessProfile.offerType;

        const industryId = businessProfile?.industry?.industryId;
        const subIndustryId = businessProfile?.subIndustry?.id;
        const distributionChannelId = businessProfile?.distributionChannel?.channelId;

        // Fetch industry and sub-industry details
        if (industryId && subIndustryId) {
          try {
            const industryData = await this.industryListService.getIndustryDetails(industryId, subIndustryId).toPromise();
            console.log(`${industryId} - ${subIndustryId}:`, industryData);
            this.subindustryDetails = industryData;
            console.log(`this.subindustryDetails:`, this.subindustryDetails);
          } catch (err) {
            this.toastr.error('An error occurred while fetching industry data.', 'Error');
            console.error(`Error fetching industry data for ${industryId} - ${subIndustryId}:`, err);
          }
        } else {
          this.toastr.error('Industry or sub-industry not found in user profile.', 'Error');
        }

        // Fetch distribution channel details
        if (distributionChannelId) {
          try {
            const distributionData = await this.industryListService.getDistributionDetails(distributionChannelId).toPromise();
            console.log(`Distribution Channel - ${distributionChannelId}:`, distributionData);
            this.distributionDetails = distributionData;
          } catch (err) {
            this.toastr.error('An error occurred while fetching distribution channel data.', 'Error');
            console.error(`Error fetching distribution channel data for ${distributionChannelId}:`, err);
          }
        } else {
          this.toastr.error('Distribution channel not found in user profile.', 'Error');
        }
      }
    } catch (err) {
      // General error handling if businessProfile is invalid or other unexpected errors
      this.toastr.error('An unexpected error occurred while fetching data.', 'Error');
      console.error('Unexpected error:', err);
    }
  }


  async handleDataFillersDropDown(filler: any[], achievedFull: any[], inputSource: string): Promise<{ filler: any[]; achievedFull: any[] }> {

    try {
      // Debugging: Log initial state
      console.log('Initial filler:', filler);
      console.log('Initial achievedFull:', achievedFull);

      // Wait for industry and distribution data to be fetched
      await this.fetchIndustryAndDistribution(this.businessProfile);
      console.log('Data fetched');

      // Filter data for users selected industry
      const industryFilterArray: any[] = [];
      let inputSourceMapIndustry = this.subindustryDetails?.[inputSource] || [];

      console.log('Initial inputSourceMapIndustry:', inputSourceMapIndustry);

      // Filter the data based on targetMarket, take out data that doesn't relate to user target market if it doesnt equal both
      if (this.targetMarket !== 'both') {
        inputSourceMapIndustry = inputSourceMapIndustry.filter((val: { B2What: string }) =>
          val.B2What === this.targetMarket || val.B2What === 'Any'
        );
      }

      console.log('Filtered inputSourceMapIndustry by targetMarket:', inputSourceMapIndustry);

      // Filter the data based on offerType, take out data that doesn't relate to user offerType if it doesnt equal both
      const offerTypeId = this.offerType.id;
      if (offerTypeId === 'product' || offerTypeId === 'both') {
        inputSourceMapIndustry = inputSourceMapIndustry.filter((val: { offerType: string }) =>
          val.offerType === offerTypeId || val.offerType === 'Any'
        );
      } else if (offerTypeId === 'service' || offerTypeId === 'both') {
        inputSourceMapIndustry = inputSourceMapIndustry.filter((val: { offerType: string }) =>
          val.offerType === offerTypeId || val.offerType === 'Any'
        );
      }

      console.log('Filtered inputSourceMapIndustry by offerType:', inputSourceMapIndustry);

 // Filter the data based on distribution channel, take data out of industry list if its doesnt match the distribution channel or if its not Any
      inputSourceMapIndustry.forEach((item: any) => {
        const matchDistributionChannel = item.distChannel?.some((channel: any) =>
            channel.id === 'Any' || this.distributionDetails?.some((detail: any) =>
              detail.channelCategoryId === channel.id
            )
        );

        if (matchDistributionChannel) {
          industryFilterArray.push(item);
        }
      });

      console.log('Filtered industryFilterArray by distribution channel:', industryFilterArray);

      // Now push the data that was filtered from the industry and Prepare data for filler and achievedFull
      filler = [];
      achievedFull = [];
      industryFilterArray.forEach((object: { name: any; id: any; inputSource: any; B2What: any }) => {
        const industryValue = {
          name: object?.name,
          id: object?.id,
          value: 1,
          inputSource: object?.inputSource,
          inputSourceList: 'industryList',
          B2What: object?.B2What,
        };
        filler.push(industryValue);
        achievedFull.push(industryValue);
      });

      console.log('Filler after processing industry data:', filler);
      console.log('AchievedFull after processing industry data:', achievedFull);
debugger
      // Now lets work on distribution channel details. Get all data from users selected distributionChannel
      for (let i = 0; i < this.distributionDetails?.length; i++) {
        let inputSourceMapDistribution = this.distributionDetails[i]?.channelInfo[0]?.[inputSource];
        // Filter the dist channel data based on targetMarket, take out data that doesn't relate to user target market if it doesnt equal both
        let filteredDistribution = inputSourceMapDistribution;
        if (this.targetMarket !== 'both') {
          filteredDistribution = filteredDistribution.filter((val: { B2What: string }) =>
            val.B2What === this.targetMarket || val.B2What === 'Any'
          );
        }

        // Now push  distribution data to filler and achievedFull
        filteredDistribution.forEach((object: { name: any; id: any; inputSource: any; B2What: any }) => {
          const distributionValue = {
            name: object?.name,
            id: object?.id,
            value: 1,
            inputSource: object?.inputSource,
            B2What: object?.B2What,
            inputSourceList: 'distributionChannels',
            channelCategoryId: this.distributionDetails?.channelCategoryId,
          };

          if (!filler.some(item => item.id === object?.id)) {
            filler.push(distributionValue);
            achievedFull.push(distributionValue);
          }
        });
      }

      console.log('Final filler:', filler);
      console.log('Final achievedFull:', achievedFull);

      return { filler, achievedFull };
    } catch (error) {
      console.error('Error handling data fillers:', error);
      throw error; // Rethrow or handle the error as needed
    }
  }



  isNoneSelected(page: number) {
    // by @leonkoech
    // purpose: function handles "none of the above" for BusinessInformation Page
    switch (page) {

      case 5:
        this.isNoneM1 = !this.isNoneM1;
        resetController(this.isNoneM1,this.marketForm.controls['marketingStrategiesOvercome'],this.marketingStrategies,this.marketingStrategiesOvercomeFull,this.marketingStrategiesOvercomeNoneAbove);
        break;

      //11
      case 6:
        this.isNoneM2 = !this.isNoneM2;
        resetController(this.isNoneM2,this.marketForm.controls['salesStrategiesOvercome'],this.salesStrategies,this.salesStrategiesOvercomeFull,this.salesStrategiesOvercomeNoneAbove);
        break;
    }
  }


  ResetForm() {
    //add void as in other one?
    this.marketForm.reset();
  }

  private async handleProductServiceQuestions(id: string): Promise<void> {
    if (id === 'product') {
      this.customerEngagementQ.nativeElement.style.display = 'block';
      this.customerServiceQ.nativeElement.style.display = 'none';
      this.marketForm.controls['customerService'].reset();
      // Disables and enables hidden fields so validators aren't required
      this.marketForm.get("customerService")?.disable();
    } else if (id === 'both') {
      this.customerServiceQ.nativeElement.style.display = 'block';
      this.customerEngagementQ.nativeElement.style.display = 'block';
    } else if (id === 'service') {
      this.customerEngagementQ.nativeElement.style.display = 'none';
      this.customerServiceQ.nativeElement.style.display = 'block';
      this.marketForm.controls['customerEngagement'].reset();
      // Disables and enables hidden fields so validators aren't required
      this.marketForm.get("customerEngagement")?.disable();
    }
  }



  onSubmit() {
    debugger
    const values =   {...this.marketForm.value as any,
      marketingStrategies: this.marketingStrategiesOvercomeFull,
      salesStrategies: this.salesStrategiesOvercomeFull
    }

    console.log(values)
    localStorage.setItem(
      "marketingForm",
      JSON.stringify(values as marketing)
    );

    this.assessmentService.postAssessment(
      values,
      this.businessProfile.uid,
      "marketing"
    );

    //Splash Info
    this.submitted = true;
    this.textToShow = "Ohhh yeaaahh. Now we've got a plan!";
    this.showSplash =  true;
    this.timeoutAssessmentProcessingMarketing = setTimeout(()=>{
      this.router.navigate(['auth-user/business-assessment-results']);
    }, (this.time*1000));
  }

}
