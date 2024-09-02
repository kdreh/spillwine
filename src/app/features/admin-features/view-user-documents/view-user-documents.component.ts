import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {DocumentSourceService} from "../../../services/document-source.service";
import {UserProfileService} from "../../../services/user-profile.service";
import {TitleComponent} from "../../../shared/components/title/title.component";
import {MatAnchor, MatFabButton} from "@angular/material/button";
import {UploadComponent} from "../../../shared/components/upload/upload.component";
import {NoDataComponent} from "../../../shared/components/no-data/no-data.component";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {SplashScreenComponent} from "../../../shared/components/splash-screen/splash-screen.component";
import {description} from "../../../shared/static/assessments/assessments-contents";
import {MatPaginator} from "@angular/material/paginator";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BackComponent} from "../../../shared/components/back/back.component";

@Component({
  selector: 'app-view-user-documents',
  standalone: true,
  imports: [
    TitleComponent,
    MatFabButton,
    UploadComponent,
    NoDataComponent,
    MatAnchor,
    MatIcon,
    NgForOf,
    NgIf,
    SplashScreenComponent,
    MatPaginator,
    MatHeaderRow,
    MatHeaderCell,
    MatColumnDef,
    MatRow,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatTable,
    MatLabel,
    MatFormField,
    MatInput,
    MatHeaderRowDef,
    MatRowDef,
    BackComponent
  ],
  templateUrl: './view-user-documents.component.html',
  styleUrl: './view-user-documents.component.scss'
})
export class ViewUserDocumentsComponent implements  OnInit, OnDestroy{
  documents:any[]=[];
  private subscription: Subscription = new Subscription();
  private documentSourceService = inject( DocumentSourceService);
  private userProfileService = inject( UserProfileService);
  isAdmin: boolean = false;
  displayedColumns: string[] = ['fileName', 'uploadedBy', 'action'];


  constructor() {
    this.documents = [];
  }


  ngOnInit(): void {
    this.subscription.add(
      this.documentSourceService.getDocumentsByAccessCode()
        .pipe(
          tap(docs => {
            if (docs && docs.length !== 0) {
              this.documents = docs.documents;
            }
          })
        )
        .subscribe()
    );
    this.subscription.add(
      this.userProfileService.getUserRole((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    );
  }


  getCleanFileName(fileName: string): string {
    return fileName.replace(/^\d+-/, '');
  }

  trackByDocument(index: number, document: any): string {
    return document.id; // Assuming each document has a unique 'id' property
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase(); // Normalize to lowercase

    this.documents = this.documents.filter(doc => {
      // Check each property of the document for the filterValue
      for(let prop in doc) {
        if (typeof doc[prop] === 'string' && doc[prop].toLowerCase().indexOf(filterValue) >= 0) {
          return true;
        }
      }
      return false;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  protected readonly description = description;
}
