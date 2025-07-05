import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category-admin',
  standalone: true,
  providers: [
    provideIcons({
      heroTrash,
      heroPlus,
    }),
  ],
  imports: [NgIcon, DatePipe, FormsModule],
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.scss',
})
export class CategoryAdminComponent implements OnInit {
  categories: any[] = [];
  newCategory: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addCategory() {
    this.categoryService.addCategory(this.newCategory).subscribe({
      next: () => {
        this.loadData();
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.newCategory = '';
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
