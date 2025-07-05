import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRegisterComponent } from './recipe-register.component';

describe('RecipeRegisterComponent', () => {
  let component: RecipeRegisterComponent;
  let fixture: ComponentFixture<RecipeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
