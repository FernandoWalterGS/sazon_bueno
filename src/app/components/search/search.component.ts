import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgIcon, FormsModule],
  providers: [
    provideIcons({
      heroMagnifyingGlass,
    }),
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataEventSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchDataParameter: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any = [];

  searchInput: string = '';

  sendSearchParameter(e: any) {
    this.searchDataParameter.emit(e.target.value);
  }

  sendData(e: any) {
    this.dataEvent.emit(e.target.value);
  }

  sendDataSelected(e: any) {
    this.dataEventSelected.emit(e.target.value);
  }

  ngOnInit(): void {}
}
