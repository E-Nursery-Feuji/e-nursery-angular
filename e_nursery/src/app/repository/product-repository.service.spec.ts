import { TestBed } from '@angular/core/testing';

import { ProductRepository } from './product-repository.service';

describe('ProductRepositoryService', () => {
  let service: ProductRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
