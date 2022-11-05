import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import { Message } from 'src/app/interfaces/message.interface';
import { pusher } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  currentUser: string = 'user';
  currentId!: number;
  message: String = '';
  recipient!: number;
  messages: Message[] = [];

  private channel!: Channel;
  private pusher = new Pusher(pusher.app_key, {
    cluster: pusher.cluter,
  });

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentId = parseInt(this.userService.currentId || '');
    this.currentUser = this.userService.currentUser || '';

    if (this.currentId == NaN || this.currentUser == '') {
      this.router.navigate(['']);
    }

    // sample channel
    this.channel = this.pusher.subscribe('321-123');

    this.channel.bind('my-event', (data: any) => {
      console.log(JSON.parse(data));
      this.messages.push(JSON.parse(data));
    });
  }

  sendMessage() {
    this.messageService
      .submitMessage(
        this.currentId,
        this.recipient,
        this.message,
        this.channel.name
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.channel.disconnect();
        },
      });
  }

  updateRecipient() {
    let newChannel = '';
    if (this.currentId > this.recipient) {
      newChannel = this.currentId + '-' + this.recipient;
    } else {
      newChannel = this.recipient + '-' + this.currentId;
    }

    // for dynamic change of channel
    // this.channel = this.pusher.subscribe(newChannel);
  }
}
