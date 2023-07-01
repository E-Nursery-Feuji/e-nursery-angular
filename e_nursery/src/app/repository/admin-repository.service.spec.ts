import { TestBed } from '@angular/core/testing';

import { AdminRepository } from './admin-repository.service';

describe('AdminRepositoryService', () => {
  let service: AdminRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
