import { TestBed } from '@angular/core/testing';

import { NgxMCarouselService } from './ngx-m-carousel.service';

describe('NgxMCarouselService', () => {
  let service: NgxMCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
