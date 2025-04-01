import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class TestComponent implements OnInit, AfterViewInit {
    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit() {
        this.setupHighlightEffect();
        this.setupImageHoverEffect();
    }

    private setupImageHoverEffect() {
        const images = document.querySelectorAll('.image-section img');
        
        images.forEach(img => {
            img.addEventListener('mousemove', (e: Event) => {
                const mouseEvent = e as MouseEvent;
                const rect = (img as HTMLElement).getBoundingClientRect();
                const x = mouseEvent.clientX - rect.left;
                const halfWidth = rect.width / 2;

                // Remove both classes first
                img.classList.remove('hover-left', 'hover-right');
                
                // Add appropriate class based on mouse position
                if (x < halfWidth) {
                    img.classList.add('hover-left');
                } else {
                    img.classList.add('hover-right');
                }
            });

            img.addEventListener('mouseleave', () => {
                img.classList.remove('hover-left', 'hover-right');
            });
        });
    }

    private setupHighlightEffect() {
        const containers = document.querySelectorAll('.scrolling-text-container') as NodeListOf<HTMLElement>;
        
        if (containers.length === 0) return;

        containers.forEach(container => {
            const spans = container.querySelectorAll('.scrolling-text span');
            
            if (spans.length === 0) return;

            const highlightZone = {
                top: container.offsetHeight / 2 - 30,
                bottom: container.offsetHeight / 2 + 30
            };

            const checkHighlight = () => {
                spans.forEach(span => {
                    const rect = span.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    const spanCenter = rect.top - containerRect.top + rect.height / 2;

                    if (spanCenter >= highlightZone.top && spanCenter <= highlightZone.bottom) {
                        span.classList.add('highlight');
                    } else {
                        span.classList.remove('highlight');
                    }
                });
            };

            function animate() {
                checkHighlight();
                requestAnimationFrame(animate);
            }

            animate();
        });
    }
}
