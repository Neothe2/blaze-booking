import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-scrollable-header',
  templateUrl: './scrollable-header.component.html',
  styleUrls: ['./scrollable-header.component.scss'],
})
export class ScrollableHeaderComponent implements AfterViewInit {
  @ViewChild('scrollableContainer', { static: false })
  scrollableContainer!: ElementRef;
  @Input('content') content: any;

  private lastScrollTop = 0;
  private isHidden = false;

  ngAfterViewInit() {
    if (this.content) {
      this.content.ionScroll.subscribe((event: any) => {
        const scrollTop = event.detail.scrollTop;
        if (scrollTop > this.lastScrollTop && !this.isHidden) {
          this.scrollableContainer.nativeElement.style.transform =
            'translateY(-100%)';
          this.isHidden = true;
        } else if (scrollTop < this.lastScrollTop && this.isHidden) {
          this.scrollableContainer.nativeElement.style.transform =
            'translateY(0)';
          this.isHidden = false;
        }
        this.lastScrollTop = scrollTop;
      });
    }
  }
}
