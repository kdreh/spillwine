import {Component,  Input} from '@angular/core';
import {JsonPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    JsonPipe,
    NgClass
  ],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
@Input() title: string ='';

@Input() description: any;
@Input() assessmentClass: string ='';

}
