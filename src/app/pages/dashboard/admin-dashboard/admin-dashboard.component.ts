import {AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {AccessCodeComponent} from "../../../tools/access-code/access-code.component";
import {TitleComponent} from "../../../shared/components/title/title.component";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {UploadComponent} from "../../../shared/components/upload/upload.component";
import {UserProfileService} from "../../../services/user-profile.service";
import {AccessCodeService} from "../../../services/access-code.service";
import {interval, Subscription} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {LoadingComponent} from "../../../shared/components/loading/loading.component";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle, MatCardTitleGroup
} from "@angular/material/card";
import {UserDetailsComponent} from "../../../features/admin-features/user-details/user-details.component";
import {DocumentSourceService} from "../../../services/document-source.service";
import {tap} from "rxjs/operators";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatInput} from "@angular/material/input";
import {MatPaginatorModule} from '@angular/material/paginator';
import {SplashScreenComponent} from "../../../shared/components/splash-screen/splash-screen.component";
import {MatSort} from "@angular/material/sort";
import { DashboardButtonsComponent } from "../../../shared/components/dasboard-buttons/dashboard-buttons.component";
import { NoDataComponent } from "../../../shared/components/no-data/no-data.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AccessCodeComponent, TitleComponent, MatIcon, MatFabButton, MatLabel, RouterLink, UploadComponent, NgIf, LoadingComponent, MatButton, MatMiniFabButton, MatCard, MatCardHeader, MatCardImage, MatCardContent, MatCardActions, MatCardTitle, MatCardSubtitle, MatCardTitleGroup, UserDetailsComponent, NgForOf, MatAnchor, MatFormField, MatTable, MatHeaderCell, MatColumnDef, MatHeaderRow, MatRow, MatPaginator, MatCell, MatInput, MatRowDef, MatHeaderRowDef, MatHeaderCellDef, MatCellDef, MatPaginatorModule, SplashScreenComponent, MatSort, DashboardButtonsComponent, NoDataComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, OnDestroy, AfterViewInit  {

  private router = inject(Router);
  private userDetailsService = inject(UserProfileService);
  private accessCodeService = inject(AccessCodeService);
  private documentSourceService = inject( DocumentSourceService);
  private subscription: Subscription;

  accessCode: string | null = null;
  errorMessage: string | null = null;
  isAdmin: boolean = false;
  loading: boolean = false;


  totalUsers: number | undefined;
  entrepreneurs:any[]=[];
  totalAdminDocs: number | undefined;
  totalUserDocs:number |undefined;
  selectedUser: any; // define selectedUser


  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['avatar', 'name', 'email', 'businessName', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    this.subscription = new Subscription();
  }



  ngOnInit(): void {
    this.subscription.add(
      this.userDetailsService.getAccessCode((accessCode) => {
        this.accessCode = accessCode;
        // console.log(accessCode);
        this.loading = false;
        this.accessCodeService.getUsersByAccessCode(this.accessCode)
          .subscribe((response) => {
            this.entrepreneurs = response.users;
            this.dataSource.data = this.entrepreneurs;
            this.totalUsers = this.entrepreneurs.length;
            this.totalUserDocs = 0;

            this.entrepreneurs.forEach(entrepreneur => {
              this.totalUserDocs += entrepreneur.documents.length;
            });
            // console.log(this.entrepreneurs);

            // Ensure paginator and sort are set after data is loaded
            this.dataSource.paginator = this.paginator!;
            this.dataSource.sort = this.sort!;
          });
      })
    );
    this.subscription.add(
      this.userDetailsService.getUserRole((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    );

    this.subscription.add(
      this.documentSourceService.getDocumentsById()
        .pipe(tap(data => this.totalAdminDocs = data.length))
        .subscribe()
    );
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewProfile(uid: string) {
    // Navigate to the profile page using the uid
    this.router.navigate([`/app/profile/${uid}`]);
  }



  showUserDetails(user: any) {
    this.selectedUser = user;
  }

 

 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
