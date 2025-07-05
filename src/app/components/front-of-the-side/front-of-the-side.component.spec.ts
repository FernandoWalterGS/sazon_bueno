import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontOfTheSideComponent } from './front-of-the-side.component';

describe('FrontOfTheSideComponent', () => {
  let component: FrontOfTheSideComponent;
  let fixture: ComponentFixture<FrontOfTheSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontOfTheSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontOfTheSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
