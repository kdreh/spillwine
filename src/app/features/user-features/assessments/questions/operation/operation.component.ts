import {Component} from '@angular/core';
import {BackComponent} from "../../../../../shared/components/back/back.component";
import {TitleComponent} from "../../../../../shared/components/title/title.component";

@Component({
  selector: 'app-operation',
  standalone: true,
    imports: [
        BackComponent,
        TitleComponent
    ],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss'
})
export class OperationComponent {

}
