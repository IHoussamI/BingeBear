import { Component, AfterViewInit, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Test3Component implements AfterViewInit {
  @ViewChild('swiper') swiperEl!: ElementRef;
  
  // No need to register Swiper here as it's already registered in main.ts
  
  ngAfterViewInit() {
    // Wait for the DOM to be fully loaded
    setTimeout(() => {
      // Get the swiper element
      const swiperElement = this.swiperEl.nativeElement;
      
      // Pass parameters to Swiper
      const params = {
        loop: true,
        slidesPerView: 4,
        speed: 1000,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }
      };
      
      // Assign it to Swiper element
      Object.assign(swiperElement, params);
      
      // Initialize Swiper
      swiperElement.initialize();
    }, 0);
  }


  movieImages: string[] = [];

  constructor() {
    // Dynamically generate an array of 30 images from the available 48
    for (let i = 1; i <= 30; i++) {
      this.movieImages.push(`/public/swiper-movies/movie${i}.jpg`);
    }
  }

  imageList: string[] = Array.from({ length: 48 }, (_, i) => `/swiper-movies/movie${i + 1}.jpg`);

}