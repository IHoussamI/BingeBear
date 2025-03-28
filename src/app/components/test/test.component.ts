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
    }

    private setupHighlightEffect() {
        const container = document.querySelector('.scrolling-text-container') as HTMLElement;
        const spans = document.querySelectorAll('.scrolling-text span');
        
        if (!container || spans.length === 0) return;

        const highlightZone = {
            top: container.offsetHeight / 2 - 30,    // half of highlight zone height
            bottom: container.offsetHeight / 2 + 30   // half of highlight zone height
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

        // Check for highlights every frame
        function animate() {
            checkHighlight();
            requestAnimationFrame(animate);
        }

        animate();
    }
}
