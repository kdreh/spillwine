import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UploadComponent} from "../../../shared/components/upload/upload.component";
import {MatAnchor, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {NoDataComponent} from "../../../shared/components/no-data/no-data.component";
import {SplashScreenComponent} from "../../../shared/components/splash-screen/splash-screen.component";
import {TitleComponent} from "../../../shared/components/title/title.component";
import {DocumentListComponent} from "../../../pages/document-list/document-list.component";

import {RouterLink} from "@angular/router";
import {UserDocumentsComponent} from "../../../tools/user-documents/user-documents.component";
import {AccessCodeComponent} from "../../../tools/access-code/access-code.component";
import { BackComponent } from "../../../shared/components/back/back.component";

@Component({
  selector: 'app-meeting-notes',
  standalone: true,
  imports: [
    UploadComponent,
    MatFabButton,
    MatIcon,
    MatAnchor,
    NgForOf,
    NgIf,
    NoDataComponent,
    SplashScreenComponent,
    TitleComponent,
    DocumentListComponent,
    UserDocumentsComponent,
    RouterLink,
    AccessCodeComponent,
    BackComponent
],
  templateUrl: './meeting-notes.component.html',
  styleUrl: './meeting-notes.component.scss'
})
export class MeetingNotesComponent {


}
