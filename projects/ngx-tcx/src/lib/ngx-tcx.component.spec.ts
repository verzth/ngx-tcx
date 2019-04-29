import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTcxComponent } from './ngx-tcx.component';

describe('NgxTcxComponent', () => {
  let component: NgxTcxComponent;
  let fixture: ComponentFixture<NgxTcxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTcxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTcxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
