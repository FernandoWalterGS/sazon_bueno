import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyAdminComponent } from './difficulty-admin.component';

describe('DifficultyAdminComponent', () => {
  let component: DifficultyAdminComponent;
  let fixture: ComponentFixture<DifficultyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifficultyAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DifficultyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
