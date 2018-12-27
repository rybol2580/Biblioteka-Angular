import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderLoansComponent } from './reader-loans.component';

describe('ReaderLoansComponent', () => {
  let component: ReaderLoansComponent;
  let fixture: ComponentFixture<ReaderLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
