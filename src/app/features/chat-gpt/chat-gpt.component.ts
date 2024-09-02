import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf } from '@angular/common';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import {AidaService} from "../../services/aida.service";
import {Subscription} from "rxjs";
import {UserProfileService} from "../../services/user-profile.service";

@Component({
  selector: 'app-chat-gpt',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFabButton,
    MatIcon,
    FormsModule,
    NgForOf,
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatIconButton,
    NgClass,
    MatCardTitle,
    MatCardSubtitle,
    MatLabel,
  ],
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.scss'],
})
export class ChatGptComponent implements OnInit, OnDestroy {
  @Output() closeChat = new EventEmitter<void>();

  private aidaService=inject(AidaService);
  private subscription:Subscription;
  private userProfileService = inject(UserProfileService);

  firstName: string | null = null;
  messages: Array<{ sender: string, content: string }> = [];
  newMessage: string = '';


  constructor() {
    this.subscription= new Subscription();
  }
  ngOnInit(): void {
    this.subscription.add(
      this.userProfileService.getUserName((name)=>{
        this.firstName = name;
        console.log(this.firstName);
      })
    )
    this.loadMessages();
  }



  sendMessage(event: Event): void {
    event.preventDefault();
    if (this.newMessage.trim()) {
      const sender = this.firstName || '';
      this.messages.push({ sender: sender, content: this.newMessage });
      this.saveMessages();
      const messageToSend = this.newMessage; // Store the message to send
      this.newMessage = '';

      // Call the chatbot service
      this.aidaService.sendMessage(messageToSend).subscribe(
        (response: any) => {
          console.log('Received response:', response); // Add this line
          // Push the bot's response to the messages array
          this.messages.push({ sender: 'Aida', content: response.message });
          this.saveMessages();
        },
        (error) => {
          console.error(error.message);
        }
      );
    }
  }




  loadMessages(): void {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      this.messages = JSON.parse(storedMessages);
    }
  }

  saveMessages(): void {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  closeChatFn(): void {
    this.closeChat.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
