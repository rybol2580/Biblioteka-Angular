import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksFromNLComponent } from './books-from-nl.component';

describe('BooksFromNLComponent', () => {
  let component: BooksFromNLComponent;
  let fixture: ComponentFixture<BooksFromNLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksFromNLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksFromNLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
