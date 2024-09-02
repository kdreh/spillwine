import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reload',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './reload.component.html',
  styleUrl: './reload.component.scss'
})
export class ReloadComponent {
@Output() reload = new EventEmitter();

private  router = inject(Router);



reloadPage (){
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([this.router.url]);
  });
  }
}
