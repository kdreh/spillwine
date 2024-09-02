import { Component } from '@angular/core';
import {UploadComponent} from "../../shared/components/upload/upload.component";
import {DocumentListComponent} from "../../pages/document-list/document-list.component";


@Component({
  selector: 'app-user-documents',
  standalone: true,
  imports: [UploadComponent, DocumentListComponent],
  templateUrl: './user-documents.component.html',
  styleUrl: './user-documents.component.scss'
})
export class UserDocumentsComponent {

}

