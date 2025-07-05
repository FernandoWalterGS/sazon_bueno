import { Component } from '@angular/core';
import { bootstrapPersonCircle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgIcon],
  providers: [
    provideIcons({
      bootstrapPersonCircle,
    }),
  ],

  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {}
