import { Component } from '@angular/core';
import { howitWorks } from './home-content';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  howitWorks:any[] | undefined;

  getHowitWorks() {
    this.howitWorks =howitWorks;
  }
  ngOnInit(){
   this.getHowitWorks();
  }
}
