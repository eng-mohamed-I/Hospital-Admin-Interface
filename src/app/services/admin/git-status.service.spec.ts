import { TestBed } from '@angular/core/testing';

import { GitStatusService } from './git-status.service';

describe('GitStatusService', () => {
  let service: GitStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
