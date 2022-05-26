import { NgModule } from '@angular/core';
import { NgxMCarouselComponent } from './ngx-m-carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    NgxMCarouselComponent
  ],
  imports: [
    BrowserAnimationsModule
  ],
  exports: [
    NgxMCarouselComponent
  ]
})
export class NgxMCarouselModule { }
