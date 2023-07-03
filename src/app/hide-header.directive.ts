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
export class HideHeaderDirective {
  private lastScrollTop = 0;
  private isHidden = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    console.log('asdfasdfasdfasdfasdfasdf');
    const scrollTop = $event.detail.scrollTop;
    if (scrollTop > this.lastScrollTop && !this.isHidden) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translateY(-100%)'
      );
      this.isHidden = true;
    } else if (scrollTop < this.lastScrollTop && this.isHidden) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translateY(0)'
      );
      this.isHidden = false;
    }
    this.lastScrollTop = scrollTop;
  }
}
