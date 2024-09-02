import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss',
})
export class BackComponent {
  @Input() name: string = '';
  @Input() buttonClass: string = '';

  back() {
    window.history.back(); //! This might not be the best method to implement.Check if there are better ways to do this
  }
}
