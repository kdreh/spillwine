import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DocumentSourceService} from '../../services/document-source.service';
import {NgForOf, NgIf} from '@angular/common';
import {NoDataComponent} from '../../shared/components/no-data/no-data.component';
import {SplashScreenComponent} from '../../shared/components/splash-screen/splash-screen.component';
import {TitleComponent} from '../../shared/components/title/title.component';
import {ButtonCardComponent} from '../../shared/components/button-card/button-card.component';
import {UploadComponent} from '../../shared/components/upload/upload.component';
import {MatAnchor, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CardComponent} from '../../shared/components/card/card.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {UserProfileService} from "../../services/user-profile.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NoDataComponent,
    SplashScreenComponent,
    TitleComponent,
    ButtonCardComponent,
    UploadComponent,
    MatFabButton,
    MatIcon,
    CardComponent,
    MatAnchor,
    NgxExtendedPdfViewerModule
  ],
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: any[] = [];
  adminUserDocuments:any[]=[];
  private subscription: Subscription = new Subscription();
  title = 'Uploaded Documents';
  description = [
    { desc: "To get started, tell us about your business " },
    { desc: "Let's check your business health and get you a roadmap for success! How would you like to get started? " },
  ];

  private documentSourceService = inject( DocumentSourceService);
  private userProfileService = inject( UserProfileService);
  isAdmin: boolean = false;
  constructor() {}

  ngOnInit() {
    this.subscription.add(
      this.documentSourceService.getDocumentsById()
        .pipe(tap(data =>  localStorage.setItem('docs', JSON.stringify(data))))
        .subscribe()
    );

    
   
    this.subscription.add(
      this.userProfileService.getUserRole((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    );
    this.getDocsFromLocalStorage()
  }


getDocsFromLocalStorage(){
  const userDocs = localStorage.getItem('docs');
  if(userDocs){
    const parsedDocs =  JSON.stringify(userDocs);
    this.documents = JSON.parse(userDocs)
  }
}
  getCleanFileName(fileName: string): string {
    return fileName.replace(/^\d+-/, '');
  }

  trackByDocument(index: number, document: any): string {
    return document.id; // Assuming each document has a unique 'id' property
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
