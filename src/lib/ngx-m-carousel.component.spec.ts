import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMCarouselComponent } from './ngx-m-carousel.component';

describe('NgxMCarouselComponent', () => {
  let component: NgxMCarouselComponent;
  let fixture: ComponentFixture<NgxMCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
