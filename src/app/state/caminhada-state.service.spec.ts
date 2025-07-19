import { TestBed } from '@angular/core/testing';

import { CaminhadaStateService } from './caminhada-state.service';

describe('CaminhadaStateService', () => {
  let service: CaminhadaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaminhadaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
