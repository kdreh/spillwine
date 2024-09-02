import {Component} from '@angular/core';
import {BackComponent} from "../../../../../shared/components/back/back.component";
import {TitleComponent} from "../../../../../shared/components/title/title.component";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    BackComponent,
    TitleComponent
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {

}
