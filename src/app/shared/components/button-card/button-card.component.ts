import {Component, Input} from '@angular/core';
import {MaterialModule} from "../../modules/material/material.module";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-button-card',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink
  ],
  templateUrl: './button-card.component.html',
  styleUrl: './button-card.component.scss'
})
export class ButtonCardComponent {
  @Input() link :string = '';
  @Input() linkUrl: string ='';
  @Input() linkClass: string = '';
}
