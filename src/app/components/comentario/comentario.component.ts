import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss',
})
export class ComentarioComponent {
  @Input() autor: string = 'walter gomez';
  @Input() fecha: string = '24/05/3030';
  @Input() comentario: string =
    ' Lorem ipsum dolor sit amet consectetur adipisicing';
}
