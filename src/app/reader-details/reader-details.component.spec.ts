import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderDetailsComponent } from './reader-details.component';

describe('ReaderDetailsComponent', () => {
  let component: ReaderDetailsComponent;
  let fixture: ComponentFixture<ReaderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
