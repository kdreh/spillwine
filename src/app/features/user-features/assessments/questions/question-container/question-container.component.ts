import {Component} from '@angular/core';
import {BackComponent} from "../../../../../shared/components/back/back.component";

@Component({
  selector: 'app-question-container',
  standalone: true,
  imports: [BackComponent, BackComponent],
  templateUrl: './question-container.component.html',
  styleUrl: './question-container.component.scss'
})
export class QuestionContainerComponent {

}
