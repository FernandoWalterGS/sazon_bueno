import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { DificultyService } from '../../services/dificulty/dificulty.service';
import { ImageService } from '../../services/file/image.service';
import { RecipeService } from '../../services/recipe/recipe.service';

export interface CurrentRecipe {
  id: number;
  name: string;
  description: string;
  image: string;
  time_min: number;
  ingredients: string;
  preparation: string;
  difficulty: string;
  category: string;
  createdAt: string;
  user: string;
}

@Component({
  selector: 'app-recipe-register',
  standalone: true,
  imports: [TitleCasePipe, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './recipe-register.component.html',
  styleUrl: './recipe-register.component.scss',
})
export class RecipeRegisterComponent implements OnInit {
  categories: any[] = [];
  difficulties: any[] = [];

  selectedFile: File | null = null;
  imageUrl: string = '';
  recipe: FormGroup;
  categoryId: number = 1;
  difficultyId: number = 1;
  loadingImage = false;
  editMode = false;
  editRecipeId = '';

  constructor(
    private categoryService: CategoryService,
    private difficultyService: DificultyService,
    private imageService: ImageService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryService = categoryService;
    this.difficultyService = difficultyService;
    this.imageService = imageService;
    this.recipeService = recipeService;

    this.recipe = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      preparation: new FormControl('', [Validators.required]),
      time_min: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      difficulty: new FormControl('', [Validators.required]),
    });

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.editMode = true;
        this.editRecipeId = params.id;
        this.uploadForm(params.id);
      }
    });
  }

  async onsubmit() {
    const id = localStorage.getItem('id');

    const cate = this.categories.find(
      (c) => c.name === this.recipe.get('category')?.value
    );
    this.categoryId = cate.id;

    const diff = this.difficulties.find(
      (d) => d.name === this.recipe.get('difficulty')?.value
    );

    this.difficultyId = diff.id;

    const recipeObject = {
      account: {
        id: Number(id),
      },
      name: this.recipe.get('name')?.value,
      description: this.recipe.get('description')?.value,
      image: this.recipe.get('image')?.value,
      time_min: this.recipe.get('time_min')?.value,
      ingredients: this.recipe.get('ingredients')?.value,
      preparation: this.recipe.get('preparation')?.value,
      difficulty: {
        id: this.difficultyId,
      },
      category: {
        id: this.categoryId,
      },
    };

    if (!this.editMode) {
      this.recipeService.saveRecipe(recipeObject).subscribe({
        next: (data) => {
          this.router.navigate(['/myrecipes']);
        },
      });
    } else {
      recipeObject.image = this.imageUrl;
      this.recipeService
        .updateRecipe(this.editRecipeId, recipeObject)
        .subscribe((data) => {
          this.router.navigate(['/myrecipes']);
        });
    }
  }
  formData: FormData = new FormData();

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.formData.append('file', this.selectedFile, this.selectedFile.name);
      this.loadingImage = true;
      this.imageService.postImage(this.formData).subscribe((data) => {
        this.imageUrl = data.data;
        this.recipe.addControl('image', new FormControl(this.imageUrl));
        this.loadingImage = false;
      });
    }
  }

  uploadForm(recipeId: number) {
    this.recipeService.getById(recipeId).subscribe((data) => {
      this.recipe.patchValue({ name: data.name });
      this.recipe.patchValue({ description: data.description });
      this.recipe.patchValue({ ingredients: data.ingredients });
      this.recipe.patchValue({ preparation: data.preparation });
      this.recipe.patchValue({ time_min: data.time_min });
      this.recipe.controls['category'].setValue(data.category);
      this.recipe.controls['difficulty'].setValue(data.difficulty);
      this.imageUrl = data.image;
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.difficultyService.getDificulties().subscribe((data) => {
      this.difficulties = data;
    });

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.editMode = true;
        this.editRecipeId = params.id;
        this.uploadForm(params.id);
      }
    });
  }
}
