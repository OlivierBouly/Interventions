import { TestBed } from '@angular/core/testing';

import { ProblemeService } from './probleme.service';

describe('ProlemeService', () => {
  let service: ProblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
