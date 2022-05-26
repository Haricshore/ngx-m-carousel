import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

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

  @Input() images: Array<String> = [];
  @Input() delay: number = 5000;
  @Input() pauseOnHover: boolean = false;
  @Input() width: String = '100%';
  @Input() height: String = '100%';
  @Input() indicators: boolean = true;
  slide: string = 'slideZero';
  x: number = 0;
  handler:any;

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

  goTo(x: number) {
    this.x = x * 100;
    this.slide = this.slide == "slideOne" ? "slideTwo" : "slideOne";
    window.clearTimeout(this.handler);
    this.toggle();
    this.onHover();
  }

  onHover(){
    if(this.pauseOnHover)window.clearTimeout(this.handler);
  }

  onLeave(){
    if(this.pauseOnHover)this.toggle();
  }

}
