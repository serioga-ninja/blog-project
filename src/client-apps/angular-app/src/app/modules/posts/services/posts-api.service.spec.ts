import {TestBed, inject} from '@angular/core/testing';

import {BlogApiService} from './posts-api.service';

describe('BlogApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogApiService]
    });
  });

  it('should be created', inject([BlogApiService], (service: BlogApiService) => {
    expect(service).toBeTruthy();
  }));
});
