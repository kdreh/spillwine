import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  busiPlanArray,
  keysToSuccess,
  keysToSuccessRadBtn,
  offerFeatures, offerFeaturesRadBtn,
  strategyRadBtn
} from '../../static/assessments/strategy';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../modules/material/material.module";
import {TitleComponent} from "../title/title.component";

@Component({
  selector: 'app-assessment-cards',
  standalone: true,
    imports: [
      ReactiveFormsModule, MaterialModule, ReactiveFormsModule, TitleComponent,
    ],
  templateUrl: './assessment-cards.component.html',
  styleUrl: './assessment-cards.component.scss'
})
export class AssessmentCardsComponent {
  @Input() strategyCards:boolean = false;
  @Input() titleCardComponent:string = '';
  @Output() assessmentCardComponent = new EventEmitter();
  duration = '1700';
protected  strategyForm = new FormGroup({

})


  protected readonly strategyRadBtn = strategyRadBtn;
  protected readonly busiPlanArray = busiPlanArray;
  protected readonly keysToSuccess = keysToSuccess;
  protected readonly keysToSuccessRadBtn = keysToSuccessRadBtn;
  protected readonly offerFeatures = offerFeatures;
  protected readonly offerFeaturesRadBtn = offerFeaturesRadBtn;
}

