import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SliderItem } from '../../interfaces/app';

@Component({
  selector: 'app-carousel',
  standalone: true,
  styleUrls: ['./carousel.component.scss'],
  templateUrl: './carousel.component.html',
  imports: [CommonModule],
})
export class CarouselComponent implements OnInit {
  @Input() slides: SliderItem[] = [];
  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
