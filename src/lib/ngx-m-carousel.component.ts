import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-m-carousel',
  templateUrl: './ngx-m-carousel.component.html',
  styleUrls: [
    './ngx-m-carousel.component.css'
  ],
  animations: [
    trigger('slide', [
      state('slideOne', style({
        transform: 'translateX(-{{translateValue}}%)'
      }),
        { params: { translateValue: 0 } }
      ),
      state('slideTwo', style({
        transform: 'translateX(-{{translateValue}}%)'
      }),
        { params: { translateValue: 0 } }
      ),
      state('slideZero', style({
      }),
        { params: { translateValue: 0 } }
      ),
      state('slideBack', style({
        transform: 'translateX({{translateValue}}%)'
      }),
        { params: { translateValue: 0 } }
      ),
      transition('*=>slideOne', [
        animate('1000ms ease-out')
      ]),
      transition('*=>slideTwo', [
        animate('1000ms ease-out')
      ]),
      transition('*=>slideZero', [
        style({ opacity: 0, transform: 'translateX(0)' }),
        animate('1500ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class NgxMCarouselComponent implements OnInit {

  @ViewChild("carousel", { read: ElementRef }) carousel!: ElementRef;

  @Input() images: Array<String> = [];
  @Input() delay: number = 5000;
  @Input() pauseOnHover: boolean = false;
  @Input() width: String = '100%';
  @Input() height: String = '100%';
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() clickToFullScreen: boolean = true;
  @Input() preserveRatioOnFullScreen: boolean = false;
  slide: string = 'slideZero';
  x: number = 0;
  handler: any;
  isFullScreen: boolean = false;

  ngOnInit() {
    this.toggle();
  }

  toggle() {
    this.handler = setTimeout(() => {
      if (this.x < (this.images.length - 1) * 100) {
        this.x = this.x + 100;
        this.slide = this.slide == "slideOne" ? "slideTwo" : "slideOne";
      } else {
        this.slide = "slideZero";
        this.x = 0;
      }
      this.toggle();
    }, this.delay);
  }

  goTo(event: Event, x: number) {
    event.stopPropagation();
    this.x = x * 100;
    this.slide = this.slide == "slideOne" ? "slideTwo" : "slideOne";
    window.clearTimeout(this.handler);
    this.toggle();
    this.onHover();
  }

  onHover() {
    if (this.pauseOnHover) window.clearTimeout(this.handler);
  }

  onLeave() {
    if (this.pauseOnHover) this.toggle();
  }

  openFullscreen() {
    if (this.clickToFullScreen) {
      this.isFullScreen = true;
      if (this.carousel?.nativeElement.requestFullscreen) {
        this.carousel?.nativeElement.requestFullscreen();
      } else if (this.carousel?.nativeElement.webkitRequestFullscreen) { /* Safari */
        this.carousel?.nativeElement.webkitRequestFullscreen();
      } else if (this.carousel?.nativeElement.msRequestFullscreen) { /* IE11 */
        this.carousel?.nativeElement.msRequestFullscreen();
      }
    }
  }

  closeFullScreen(event: Event) {
    event.stopPropagation();
    this.isFullScreen = false;
    if (this.isFullScreen && document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) { /* Safari */
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { /* IE11 */
      (document as any).msExitFullscreen();
    }
  }

}
