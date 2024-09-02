// src/app/shared/modules/material/material.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDatepickerModule, MatDateRangePicker} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatTableModule,
  MatCell, MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
} from '@angular/material/table';
import {MatCardModule} from "@angular/material/card";

const Material = [
  CommonModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatAnchor,
  MatListModule,
  MatIconModule,
  MatStepperModule,
  MatRadioModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,          // Importing MatTableModule for table functionality
  MatRow,
  MatCell,
  MatDateRangePicker,
  MatHeaderCell,
  MatHeaderRowDef,
  MatRowDef,
  MatColumnDef,
  MatHeaderRow,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: Material,
  exports: Material
})
export class MaterialModule {}
