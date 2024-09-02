import {Component, Input} from '@angular/core';

@Component({
  selector: 'no-data',
  standalone: true,
  imports: [],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss'
})
export class NoDataComponent {
@Input() title : string =  '';

}

