import { TestBed } from '@angular/core/testing';

import { DificultyService } from './dificulty.service';

describe('DificultyService', () => {
  let service: DificultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DificultyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
