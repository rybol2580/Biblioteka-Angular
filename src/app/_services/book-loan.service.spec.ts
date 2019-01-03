import { TestBed } from '@angular/core/testing';

import { BookLoanService } from './book-loan.service';

describe('BookLoanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookLoanService = TestBed.get(BookLoanService);
    expect(service).toBeTruthy();
  });
});
