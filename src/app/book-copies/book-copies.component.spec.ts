import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCopiesComponent } from './book-copies.component';

describe('BookCopiesComponent', () => {
  let component: BookCopiesComponent;
  let fixture: ComponentFixture<BookCopiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCopiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
