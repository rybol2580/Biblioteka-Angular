import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderReturnedLoansComponent } from './reader-returned-loans.component';

describe('ReaderReturnedLoansComponent', () => {
  let component: ReaderReturnedLoansComponent;
  let fixture: ComponentFixture<ReaderReturnedLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderReturnedLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderReturnedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
