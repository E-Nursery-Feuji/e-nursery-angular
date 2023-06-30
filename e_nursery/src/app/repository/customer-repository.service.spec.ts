import { TestBed } from '@angular/core/testing';

import { CustomerRepository} from './customer-repository.service';

describe('CustomerRepositoryService', () => {
  let service: CustomerRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
