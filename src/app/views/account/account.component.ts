import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPower, heroTrash } from '@ng-icons/heroicons/outline';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [DatePipe, NgIcon, CommonModule],
  providers: [provideIcons({ heroTrash, heroPower })],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  accounts: any[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.uploadAcoounts();
  }

  uploadAcoounts() {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }

  delete(id: number) {
    this.accountService.deleteAccount(id).subscribe((data) => {
      this.uploadAcoounts();
    });
  }

  restore(id: number) {
    this.accountService.restoreAccount(id).subscribe((data) => {
      this.uploadAcoounts();
    });
  }
}
