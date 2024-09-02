import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetUserDataService } from '../../../../../services/get-user-data.service';
import { BackComponent } from "../../../../../shared/components/back/back.component";
import { TitleComponent } from "../../../../../shared/components/title/title.component";
import { description } from "../../../../../shared/static/assessments/assessments-contents";
import { NgClass, NgIf } from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { busiPlanArray,
  keysToSuccess,
  keysToSuccessRadBtn,
  offerFeatures,
  threatsOvercomeNoneAbove,
  barriersOvercomeNoneAbove,
  noneAbove,
  barriersDropdown,
  offerFeaturesRadBtn,
  strategyRadBtn
} from '../../../../../shared/static/assessments/strategy';
import { IndustryListService } from "../../../../../services/industry-list.service";
import { MaterialModule } from "../../../../../shared/modules/material/material.module";
import {Router} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {Dropdowns} from "../../../../../shared/static/assessments/dropdown";
import {resetController} from "../../../../../shared/static/functions";
import {AssessmentService} from "../../../../../services/assessment.service";
import {strategy} from "./strategy";

@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [
    BackComponent,
    TitleComponent,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {
  // public userInformation = (): any => {
  //   return this.userDataService.userInformation()
  // };
  public strategyForm!: FormGroup;
  public busiPlanArray!: FormGroup;
  public B2B: boolean = false;
  public B2C: boolean = false;
  // public BarriersOvercome: boolean = false;
  //Handle NoneAbove
  selectedOption: string[] = [];
  public isNoneS1: boolean = false;
  public isNoneS2: boolean = false;
  public industry: any;
  public userData: any;

  @ViewChild('B2B') b2b!: ElementRef;
  @ViewChild('B2C') b2c!: ElementRef;
  @ViewChild('barriers') barriersOvercomeQ!: ElementRef;


  //Splash Timer info
  timeoutAssessmentProcessingStrategy: any;
  textToShow: any;
  showSplash: boolean = false;
  time = 15;
  submitted: boolean = false;
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
      this.strategy();
      this.handleAfterProfileLoad(); // Ensure this function runs after profile load
    }).catch(error => {
      console.error('Error loading user profile:', error);
    });
  }

  private async handleAfterProfileLoad(): Promise<void> {
    try {
      // Await the results from asynchronous methods
      const barriersResult = await this.handleDataFillersDropDown(this.barriersFull, this.barriersOvercomeFull, 'barriers');
      this.barriersOvercomeFull = barriersResult.filler;

      const threatsResult = await this.handleDataFillersDropDown(this.threatsFull, this.threatsOvercomeFull, 'threats');
      this.threatsOvercomeFull = threatsResult.filler;

      this.keysToSuccess = await this.handleDataFillersTable('keysToSuccess');
      this.offerFeatures = await this.handleDataFillersTable('offerFeatures');
    } catch (error) {
      console.error('Error handling data fillers:', error);
    }
  }



  strategy() {
    this.strategyForm = this.fb.group({
     busiPlanArray: this.fb.group({
        busiPlanExecSum: [null, Validators.required],
        busiPlanMisVisGoal: [null, Validators.required],
        busiPlanBusiSum: [null, Validators.required],
        busiPlanOfferDescrip: [null, Validators.required],
        busiPlanIndustryOverview: [null, Validators.required],
        busiPlanTargetMarket: [null, Validators.required],
        busiPlanMarketingSummary: [null, Validators.required],
        busiPlanSaleStrategy: [null, Validators.required],
        busiPlanTeamOverview: [null, Validators.required],
        busiPlanFinancialProjections: [null, Validators.required]
      }),
      threatsOvercome: [null, Validators.required],
      barriersOvercome: [null, Validators.required],
      offerFeatures: this.fb.array([]),
      keysToSuccess: this.fb.array([]),
    });
  }

  /***Start Handle Data variables***/
  
  targetMarket: any;
  offerType: any;
  distributionDetails: any;
  subindustryDetails: any;


  // by @leonkoech
  // created a permanent storage for dropdowns.

  barriersFull: any[] = [];
  barriersOvercomeFull: any[] = [];
  barriers = this.barriersFull;
  barriersOvercome = this.barriersOvercomeFull;

  threatsOvercomeFull: Dropdowns[] = [];
  threatsFull: any = [];
  threats = this.threatsFull;
  threatsOvercome = this.threatsOvercomeFull;

  keysToSuccess: any;
  offerFeatures: any;

  /***End handle Data variables***/


  strategyRadBtn = strategyRadBtn;
  offerFeaturesRadBtn = offerFeaturesRadBtn;
  keysToSuccessRadBtn = keysToSuccessRadBtn;
  threatsOvercomeNoneAbove = threatsOvercomeNoneAbove;
  barriersOvercomeNoneAbove = barriersOvercomeNoneAbove;


  get keysToSuccessFormArray(): FormArray<FormGroup> {
    return this.strategyForm.get('keysToSuccess') as FormArray<FormGroup>;
  }

  get offerFeaturesFormArray(): FormArray<FormGroup> {
    return this.strategyForm.get('offerFeatures') as FormArray<FormGroup>;
  }


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

  async handleDataFillersTable(inputSource: string): Promise<void> {
    // Determine which form array to use

    const formArray: FormArray<FormGroup> = inputSource === 'keysToSuccess'
      ? this.keysToSuccessFormArray
      : inputSource === 'offerFeatures'
        ? this.offerFeaturesFormArray
        : new FormArray<FormGroup>([]);

    // BEGIN FILTERING //
    let industryFilterArray: any[] = [];
    let inputSourceMapIndustry = this.subindustryDetails?.[inputSource] || [];

    // Filter based on targetMarket
    if (this.targetMarket !== 'both') {
      inputSourceMapIndustry = inputSourceMapIndustry.filter((val: { B2What: string }) =>
        val.B2What === this.targetMarket || val.B2What === 'Any'
      );
    }

    // Filter based on offerType
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

    // Filter based on distribution channel
    inputSourceMapIndustry.forEach((item: { distChannel: any[]; }) => {
      if (item.distChannel?.some(channel =>
        channel.id === 'Any' || this.distributionDetails?.some((detail: { channelCategoryId: any; }) => detail.channelCategoryId === channel.id)
      )) {
        industryFilterArray.push(item);
      }
    });

    // END FILTERING //

    // BEGIN PUSH DATA //
    let alreadyInArray: boolean;

    inputSourceMapIndustry.forEach((object: { name: any; description: any; id: any; inputSource: any; B2What: any }) => {
      if (formArray) {
        formArray.push(
          this.fb.group({
            name: object?.name,
            description: object?.description,
            weight: 1,
            value: [null, Validators.required],
            id: object?.id,
            inputSource: object?.inputSource,
            B2What: object?.B2What,
            inputSourceList: 'industryList',
          })
        );
      }
    });

    // Handle distribution channel data
    for (let i = 0; i < this.distributionDetails?.length; i++) {
      let inputSourceMapDistribution = this.distributionDetails[i]?.channelInfo[0]?.[inputSource];
      if (this.targetMarket !== 'both') {
        inputSourceMapDistribution = inputSourceMapDistribution.filter((val: any) => val.B2What === this.targetMarket || val.B2What === 'Any');
      }

      inputSourceMapDistribution.forEach((object: any) => {
        alreadyInArray = formArray.controls.some((formGroup: FormGroup) => formGroup.get('id')?.value === object?.id);

        if (!alreadyInArray) {
          formArray.push(
            this.fb.group({
              name: object?.name,
              description: object?.description,
              weight: 1,
              value: [null, Validators.required],
              id: object?.id,
              inputSource: object?.inputSource,
              B2What: object?.B2What,
              channelCategoryId: this.distributionDetails?.channelCategoryId,
              inputSourceList: 'distributionChannels',
            })
          );
          console.log('success', object);
        }
      });
    }
  }



  pushValue(i: number, newValue: number, inputSource: string) {
    // Define form arrays
    let keysToSuccessFormArray: FormArray = this.keysToSuccessFormArray; // Assuming you have this defined
    let offerFeaturesFormArray: FormArray = this.offerFeaturesFormArray; // Assuming you have this defined

    // Map inputSource to corresponding form array
    let formArray: FormArray;
    if (inputSource === 'keysToSuccess') {
      formArray = keysToSuccessFormArray;
    } else if (inputSource === 'offerFeatures') {
      formArray = offerFeaturesFormArray;
    } else {
      console.error('Invalid input source');
      return;
    }

    // Check if formArray is defined and the index is valid
    if (formArray && i >= 0 && i < formArray.length) {
      formArray.at(i).patchValue({ value: newValue });
    } else {
      console.error('Invalid form array or index');
    }
  }


  isNoneSelected(page: number) {
    // by @leonkoech
    // purpose: function handles "none of the above" for BusinessInformation Page
    switch (page) {
      case 1:
        this.isNoneS1 = !this.isNoneS1;
        resetController(this.isNoneS1,this.strategyForm.controls["barriersOvercome"],this.barriersOvercome,this.barriersOvercomeFull,this.barriersOvercomeNoneAbove);
        break;

      case 2:
        this.isNoneS2 = !this.isNoneS2;
        resetController(this.isNoneS2,this.strategyForm.controls["threatsOvercome"],this.threatsOvercome,this.threatsOvercomeFull,this.threatsOvercomeNoneAbove);
        break;
    }
  }

  ResetForm() {
    //add void as in other one?
    this.strategyForm.reset();
  }


  get strategyFormGroupControls() {
    // @ts-ignore
    return this.strategyForm.get('busiPlanArray')['controls'];
  }


  onSubmit() {
    debugger
    const values =   {...this.strategyForm.value as any,
      barriers: this.barriersOvercomeFull,
      threats: this.threatsOvercomeFull,
    }

    console.log(values)
    localStorage.setItem(
      "strategyForm",
      JSON.stringify(values as strategy)
    );

    this.assessmentService.postAssessment(
      values,
      this.businessProfile.uid,
      "strategy"
    );

    //Splash Info
    this.submitted = true;
    this.textToShow = "Ohhh yeaaahh. Now we've got a plan!";
    this.showSplash =  true;
    this.timeoutAssessmentProcessingStrategy = setTimeout(()=>{
      this.router.navigate(['auth-user/business-assessment-results']);
    }, (this.time*1000));
  }

}
