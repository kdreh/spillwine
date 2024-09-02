import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FileUploadService } from "../../../services/file-upload.service";
import { ToastrService } from "ngx-toastr";
import { NgIf } from "@angular/common";
import { UserProfileService } from "../../../services/user-profile.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [NgIf],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  exportAs: 'appUpload'
})
export class UploadComponent implements OnInit, OnDestroy {

  private fileUploadService = inject(FileUploadService);
  private userDetailsService = inject(UserProfileService);
  private toastr = inject(ToastrService);
  private subscription: Subscription = new Subscription();

  fileName: string = '';
  fileSrc: string = '';
  fileUrl: string = '';
  email: string = '';
  role: string = 'user';
  uid: string | null = '';
  firstName: string = '';
  lastName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.subscription.add(
      this.userDetailsService.getUserRole((isAdmin) => {
        this.role = isAdmin ? 'admin' : 'user';
      })
    );
    this.subscription.add(
      this.userDetailsService.getUserEmail((email) => {
        this.email = email || '';
      })
    );
    this.subscription.add(
      this.userDetailsService.getUserName((firstName) => {
        this.firstName = firstName || '';
      })
    );
    this.subscription.add(
      this.userDetailsService.getUserUID((uid) => {
        this.uid = uid || '';
        console.log("upload comp uid", uid)
      })
    );
    this.subscription.add(
      this.userDetailsService.getUserLastName((lastName) => {
        this.lastName = lastName || '';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.toastr.error(
          "File size exceeds the limit of 10MB. Please choose a smaller file.",
          "",
          { positionClass: "toast-top-center" }
        );
      } else {
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fileSrc = e.target.result as string;

          const formData: FormData = new FormData();
          formData.append('file', file, file.name);
          formData.append('email', this.email);
          formData.append('role', this.role);
          formData.append('firstName', this.firstName);
          formData.append('lastName', this.lastName);
          formData.append('uid', this.uid ?? '');

          console.log("upload formData ", formData,"UID", this.uid);

          this.fileUploadService.userUploadFile(formData).subscribe({
            next: (res: any) => {
              this.fileUrl = res.url;
              this.toastr.success(
                "File uploaded successfully.",
                "",
                { positionClass: "toast-top-center" }
              );
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            },
            error: (err: any) => {
              console.error('Upload error:', err);
              this.toastr.error(
                "Something wrong with file upload.",
                "",
                { positionClass: "toast-top-center" }
              );
            }
          });
        };

        reader.readAsDataURL(file);
      }
    }
  }
}
