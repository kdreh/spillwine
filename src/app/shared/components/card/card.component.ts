import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardContent,
    NgClass,
    MatCard,
    MatIcon,
    MatCardModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cardData: any[] | undefined;
  @Input() cardTitle: string | undefined;
  @Input() cardSubtitle: string | undefined;
  @Input() cardImage: string | undefined;
  @Input() cardImageProfile: string | undefined;
  @Input() cardText: string | undefined;
  @Input() cardLinks: string | undefined;
  @Input() cardLinkTexts: string | undefined
  @Input() scoreGrade: string | undefined;
  @Input() icon: string | undefined;
  @Input() iconColor: string | undefined;
  @Input() iconSize: string | undefined;
  @Input() cardStyle: any [] | undefined;

  @Input() color: string | undefined;
  @Input() bottomBorderColor: string | undefined;
  @Input() emphasis: string | undefined;
}
