import { TestBed } from '@angular/core/testing';

import { NationalLibraryService } from './national-library.service';

describe('NationalLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NationalLibraryService = TestBed.get(NationalLibraryService);
    expect(service).toBeTruthy();
  });
});
