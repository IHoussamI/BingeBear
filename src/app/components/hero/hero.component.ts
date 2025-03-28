import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { HttpClient } from '@angular/common/http';

register();

interface PricingPlan {
  title: string;
  discountText: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  planType: 'individual' | 'family';
}
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroComponent implements OnInit {

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.offsetTop - (window.innerHeight / 2) + (element.clientHeight / 2);
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
  }
}

  private animatedElements: Element[] = [];


  ngOnInit() {
    this.animatedElements = Array.from(document.querySelectorAll('.animated-text'));
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    const windowHeight = window.innerHeight;

    this.animatedElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const triggerPoint = windowHeight * 0.8;

      if (rect.top <= triggerPoint) {
        element.classList.add('visible');
      }
    });
  }
  steps = [
    {
      number: 1,
      title: 'Pick a Plan',
      description: 'Choose the best plan for you and submit your contact details. No payment needed yet.'
    },
    {
      number: 2,
      title: 'Instant Connection with an Agent',
      description: 'Get connected with our expert agent who will activate your subscription and ensure everything runs smoothly.'
    },
    {
      number: 3,
      title: 'Make Payment',
      description: 'Make your payment hassle-free using your preferred method, with step-by-step guidance from our agent.'
    },
    {
      number: 4,
      title: 'Enjoy & Stay Connected',
      description: 'Start using our service instantly and save our contact for any future support or inquiries.'
    }
  ];
  selectedDevice: string = 'apple'; // Default selection is 'apple'

  selectDevice(device: string) {
    this.selectedDevice = device;
  }
  form = {
    email: '',
    phone: '',
  };

  submissionStatus: 'success' | 'error' | 'none' = 'none';

  constructor(private http: HttpClient) {}

  submitForm() {
    this.http.post('http://localhost:8080/api/contact', this.form).subscribe(
        (response: any) => { 
            if (response.message) {
                this.submissionStatus = 'success';
                this.resetForm();
            } else {
                this.submissionStatus = 'error';
            }
        },
        error => {
            this.submissionStatus = 'error';
        }
    );
}

  resetForm() {
    this.form = {
      email: '',
      phone: ''
    };
  }
  isOpen1 = false;
  isOpen2 = false; 
  isOpen3 = false; 
  isOpen4 = false; 
  isOpen5 = false; 
  isOpen6 = false; 
  isOpen7 = false; 
  isOpen8 = false; 
  isOpen9 = false; 
  isOpen10 = false; 
  isOpen11 = false; 
  isOpen12 = false; 
  isOpen13 = false; 
  isOpen14 = false; 
  isOpen15 = false; 
  isOpen16 = false; 

  selectedPlanType: 'individual' | 'family' = 'individual';

  selectPlanType(type: 'individual' | 'family') {
    this.selectedPlanType = type;
  }

  allPlans: PricingPlan[] = [
    // Individual Plans
    {
      title: 'BASIC PLAN',
      discountText: '(Regularly €99 – Save 30%)',
      price: '€69',
      duration: '/year',
      description: '(12 Months + 2 Free = 14 Months Total)',
      features: [
        'Instant Access',
        'AI Powered Server',
        'Anti Freeze AI Technology',
        '130,000+ Live Channels – Movies, sports, shows',
        '4K Streaming',
        'EPG Program Guide',
        'Catch Up Feature',
        '24/7 Support',
        'Optional Adult Content',
        '120-Day Money-Back Guarantee'
      ],
      ctaText: 'Join basic plan',
      planType: 'individual'
    },
    {
      title: 'POPULAR PLAN',
      discountText: '(Regularly €169 – Save 41%)',
      price: '€118',
      duration: '/2 years',
      description: '(24 Months + 4 Free = 28 Months Total)',
      features: [
        'Instant Access',
        'AI Powered Server',
        'Anti Freeze AI Technology',
        '130,000+ Live Channels – Movies, sports, shows',
        '4K Streaming',
        'EPG Program Guide',
        'Catch Up Feature',
        '24/7 Support',
        'Optional Adult Content',
        '120-Day Money-Back Guarantee'
      ],
      isPopular: true,
      ctaText: 'Join popular plan',
      planType: 'individual'
    },
    // Family Plans 
    {
      title: 'PREMIUM PLAN',
      discountText: 'Save 40%',
      price: '€169',
      duration: '/year',
      description: '(36 Months + 6 Free = 42 Months Total)',
      features: [
        'All Previous Features',
        'Priority Support',
        '42 months Can be split and used on 3 different devices simultaneously',
        '120-Day Money-Back Guarantee',
      ],
      ctaText: 'Join premium plan',
      planType: 'family'
    },
    {
      title: 'Lifetime Plan',
      discountText: 'Save 40%',
      price: '€349',
      duration: 'One Time',
      description: '(Pay once—never worry about renewals or price increases)',
      features: [
        'All Previous Features',
        'Priority Support',
        'Can be used on 2 different devices but not used simultaneously',
        '120-Day Money-Back Guarantee',
      ],
      isPopular: true,
      ctaText: 'Join lifetime plan',
      planType: 'family'
    }
  ];

  get plans() {
    return this.allPlans.filter(plan => plan.planType === this.selectedPlanType);
  }

  ngAfterViewInit() {
    this.setupHighlightEffect();
  }

  private setupHighlightEffect() {
    const container = document.querySelector('.scrolling-text-container') as HTMLElement;
    const spans = document.querySelectorAll('.scrolling-text span');

    if (!container || spans.length === 0) return;

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
  }



}

