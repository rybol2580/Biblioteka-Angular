import { TestBed } from '@angular/core/testing';

import { BookCopyService } from './book-copy.service';

describe('BookCopyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookCopyService = TestBed.get(BookCopyService);
    expect(service).toBeTruthy();
  });
});
