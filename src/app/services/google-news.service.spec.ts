import { TestBed, inject } from '@angular/core/testing';

import { GoogleNewsService } from './google-news.service';

describe('GoogleNewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleNewsService]
    });
  });

  it('should be created', inject([GoogleNewsService], (service: GoogleNewsService) => {
    expect(service).toBeTruthy();
  }));
});
