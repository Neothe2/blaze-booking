import {
  Directive,
  Renderer2,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective implements OnInit {
  private lastY = 0;
  private headerEl: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.headerEl = this.el.nativeElement.querySelector('ion-header');
    this.renderer.setStyle(this.headerEl, 'transition', 'transform 700ms');
    console.log('b');
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    console.log('a');
    if ($event.detail.scrollTop > this.lastY) {
      this.renderer.setStyle(
        this.headerEl,
        'transform',
        `translateY(-${this.headerEl.clientHeight}px)`
      );
    } else {
      this.renderer.setStyle(this.headerEl, 'transform', 'translateY(0)');
    }
    this.lastY = $event.detail.scrollTop;
  }
}
