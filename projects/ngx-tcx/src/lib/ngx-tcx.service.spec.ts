import { TestBed } from '@angular/core/testing';

import { NgxTcxService } from './ngx-tcx.service';

describe('NgxTcxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxTcxService = TestBed.get(NgxTcxService);
    expect(service).toBeTruthy();
  });
});
