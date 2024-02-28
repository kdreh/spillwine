import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss']
})
export class KnowledgeComponent {


  url: string = 'https://mesearch.ai/spillwinepublishing/knowledgemarket';
  urlSafe: SafeResourceUrl | undefined;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
