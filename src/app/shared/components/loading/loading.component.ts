import {Component, inject, Input, OnInit} from '@angular/core';
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent  implements OnInit{
  @Input() title: string = '';
  @Input() loadingMessage: string ='';

  sharedService = inject(SharedService)
  isLoading: boolean = true;

  ngOnInit(): void {
    this.sharedService.loading().subscribe(()=>{
      this.isLoading = false;
    })
  }
}
