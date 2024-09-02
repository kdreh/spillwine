import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialogue.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['confirm-dialogue.component.scss']
})
export class ConfirmDialogComponent {

  readonly confirmDelRef = inject(MatDialogRef<ConfirmDialogComponent>,);


  onNoClick(): void {
    this.confirmDelRef.close();
  }
}
