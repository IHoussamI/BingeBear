import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component implements OnInit, AfterViewInit, OnDestroy {
  private animationFrame: number = 0;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.setupHighlightEffect();
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private setupHighlightEffect() {
    const container = document.querySelector('.scrolling-section') as HTMLElement;
    const words = document.querySelectorAll('.word') as NodeListOf<HTMLElement>;
    
    if (!container || !words.length) return;

    const checkHighlight = () => {
      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const wordCenterY = wordRect.top + wordRect.height / 2;
        
        if (Math.abs(centerY - wordCenterY) < 30) {
          word.classList.add('active');
        } else {
          word.classList.remove('active');
        }
      });

      this.animationFrame = requestAnimationFrame(checkHighlight);
    };

    checkHighlight();
  }
}