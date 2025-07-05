import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { bootstrapStarFill } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [NgIcon, CommonModule],
  providers: [
    provideIcons({
      bootstrapStarFill,
    }),
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements OnInit {
  @Output() sendRating = new EventEmitter<number>();
  _activeStars: number = 0;

  @Input()
  set activeStars(value: number) {
    this._activeStars = value;
    this.setArrayRatings();
  }

  get activeStars(): number {
    return this._activeStars;
  }

  itemRating = [
    { rating: 1, text: 'Mala', active: false },
    { rating: 2, text: '', active: false },
    { rating: 3, text: '', active: false },
    { rating: 4, text: '', active: false },
    { rating: 5, text: 'Genial', active: false },
  ];

  ngOnInit(): void {
    // setArrayRatings() is now called by the setter of activeStars
  }

  setArrayRatings() {
    this.itemRating.forEach((i, index) =>
      index < this.activeStars ? (i.active = true) : (i.active = false)
    );
  }

  capturaRating(rating: number) {
    this.sendRating.emit(rating);
  }
}
