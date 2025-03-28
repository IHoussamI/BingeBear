import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  selector: 'app-test2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.css'
})
export class Test2Component {
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

  footerText = 'No hidden fees. Cancel anytime.';
}