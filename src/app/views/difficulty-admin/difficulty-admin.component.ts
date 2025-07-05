import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { DificultyService } from '../../services/dificulty/dificulty.service';

@Component({
  selector: 'app-difficulty-admin',
  standalone: true,
  providers: [
    provideIcons({
      heroTrash,
      heroPlus,
    }),
  ],
  imports: [NgIcon, DatePipe, FormsModule],
  templateUrl: './difficulty-admin.component.html',
  styleUrl: './difficulty-admin.component.scss',
})
export class DifficultyAdminComponent implements OnInit {
  difficulties: any[] = [];
  newDifficulty: string = '';

  constructor(private difficultyService: DificultyService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.difficultyService.getDificulties().subscribe((data) => {
      this.difficulties = data;
    });
  }

  addDifficulty() {
    this.difficultyService.addDifficulty(this.newDifficulty).subscribe({
      next: () => {
        this.loadData();
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.newDifficulty = '';
  }

  deleteDificulty(id: number) {
    this.difficultyService.deleteDifficulty(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
