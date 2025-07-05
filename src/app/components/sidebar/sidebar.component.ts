import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  bootstrapArrowUpSquareFill,
  bootstrapBookFill,
  bootstrapBookmarkFill,
  bootstrapDoorOpenFill,
  bootstrapList,
  bootstrapPeopleFill,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, NgIcon],
  providers: [
    provideIcons({
      bootstrapPeopleFill,
      bootstrapBookFill,
      bootstrapBookmarkFill,
      bootstrapArrowUpSquareFill,
      bootstrapDoorOpenFill,
      bootstrapList,
    }),
  ],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  // showSidebar: string = 'hidden ';
  constructor(private authService: AuthService) {}

  changeActiveSidebar() {
    // this.showSidebar = this.showSidebar == 'hidden' ? '' : 'hidden';
  }

  closeSesion() {
    this.authService.logout();
  }
}
