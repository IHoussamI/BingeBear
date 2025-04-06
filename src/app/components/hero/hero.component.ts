import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PlanService } from '../../Services/PlanService';
import { FreeTrialService, FreeTrialResponse } from '../../Services/free-trial.service';

register();

interface PricingPlan {
  id:number,
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

  @ViewChild('swiper') swiperEl!: ElementRef;


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
  imageList: string[] = Array.from({ length: 50 }, (_, i) => `/swiper-movies/movie${i + 1}.jpg`);


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
      title: 'Enter Your Email Address',
    },
    {
      number: 2,
      title: 'Add Your WhatsApp Number',
    },
    {
      number: 3,
      title: 'Click and Unlock Free 24H Trial',
    },
    {
      number: 4,
      title: 'Instant Connection with an Agent',
      description: 'Get connected with our expert agent who will activate your subscription and ensure everything runs smoothly.'
    }
  ];
  selectedDevice: string = 'apple'; // Default selection is 'apple'

  selectDevice(device: string) {
    this.selectedDevice = device;
  }
  form = {
    firstname: '',
    email: '',
    phone: '',
  };

  submissionStatus: 'success' | 'error' | 'none' = 'none';

  // --- Free Trial Properties ---
  freeTrialData = {
    email: '',
    firstName: '',
    whatsappNumber: null as number | null // Initialize as null, allow number
  };
  isSubmittingTrial = false;
  trialSubmissionStatus: 'success' | 'error' | 'pending' | 'none' = 'none';
  trialResponseMessage: string = ''; // To hold success/error messages
  // --- End Free Trial Properties ---

  constructor(
    private http: HttpClient,
    private router: Router,
    private planService: PlanService,
    private freeTrialService: FreeTrialService // Inject the service
  ) {}

  goToCheckout(selectedPlan: any) {
    this.planService.setSelectedPlan(selectedPlan);
    this.router.navigate(['/checkout']);
  }


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

  // --- Free Trial Method ---
  requestFreeTrial() {
    // Basic validation (can be enhanced in the template with required attributes)
    if (!this.freeTrialData.email || !this.freeTrialData.whatsappNumber || !this.freeTrialData.firstName) {
      console.error('Free trial form is incomplete.');
      this.trialSubmissionStatus = 'error';
      this.trialResponseMessage = 'Please fill in all required fields (First Name, Email, WhatsApp Number).';
      return; // Prevent submission if basic fields are missing
    }

    this.isSubmittingTrial = true;
    this.trialSubmissionStatus = 'pending';
    this.trialResponseMessage = ''; // Clear previous messages

    // Ensure whatsappNumber is a number if provided
    const payload = {
        ...this.freeTrialData,
        whatsappNumber: this.freeTrialData.whatsappNumber ? Number(this.freeTrialData.whatsappNumber) : null
    };

    this.freeTrialService.requestTrial(payload).subscribe({
      next: (response: FreeTrialResponse) => {
        console.log('Free trial request successful', response);
        this.trialSubmissionStatus = 'success';
        this.trialResponseMessage = 'Success! Please check your email to verify your free trial.';
        // Optionally reset form fields
        // this.freeTrialData = { email: '', firstName: '', whatsappNumber: null };
      },
      error: (error: HttpErrorResponse) => {
        console.error('Free trial request failed', error);
        this.trialSubmissionStatus = 'error';
        // Access specific error message from the backend if available
        const backendMessage = (error.error instanceof ErrorEvent) ? 
            error.error.message : // Client-side or network error
            error.error?.message; // Backend-side error message (adjust based on backend response structure)
        this.trialResponseMessage = backendMessage || 'An error occurred. Please try again.';
      },
      complete: () => {
        this.isSubmittingTrial = false;
      }
    });
  }
  // --- End Free Trial Method ---

  resetForm() {
    this.form = {
      firstname:'',
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
      id:1,
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
      id:2,
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
      id:3,
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
      id:4,
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
    this.setupImageHoverEffect();
    this.initializeSwiper();

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
  
  // No need to register Swiper here as it's already registered in main.ts
  
  private initializeSwiper() {
    const swiperElement = this.swiperEl.nativeElement;
    const params = {
      slidesPerView: 4,
      speed: 2000,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }
    };
      
      Object.assign(swiperElement, params);
      swiperElement.initialize();
    }
  
    movieImages: string[] = [];
  }
