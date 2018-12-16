import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadersReportComponent } from './readers-report.component';

describe('ReadersReportComponent', () => {
  let component: ReadersReportComponent;
  let fixture: ComponentFixture<ReadersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
