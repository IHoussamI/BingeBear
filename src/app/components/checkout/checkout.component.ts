import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { PlanService } from '../../Services/PlanService';
import { v4 as uuidv4 } from 'uuid'; 

interface Plan {
  id: any;
  title: string;
  description: string;
  price: any;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  selectedPlan: Plan | null = null;
  checkoutForm: FormGroup;
  isSubmitting = false;
  sessionId: string;

  constructor(
    private planService: PlanService,
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.sessionId = uuidv4(); // Generate unique session ID
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['Ireland', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      whatsapp: ['']
    });
  }

  ngOnInit(): void {
    this.selectedPlan = this.planService.getSelectedPlan();
    if (!this.selectedPlan) {
      console.warn('No plan selected - redirecting to home');
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid || !this.selectedPlan || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const formValue = this.checkoutForm.value;

    // Create order data matching backend expectations
    this.orderService.createOrder(
      this.sessionId,
      this.selectedPlan.id,
      formValue.email
    ).subscribe({
      next: (response) => {
        // Create client info
        const clientData = {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          phone: formValue.phone,
          country: formValue.country,
          city: formValue.city
        };

        // You might want to save client info separately
        this.planService.clearSelectedPlan();
        this.router.navigate(['/order-confirmation'], {
          state: { 
            order: response,
            client: clientData 
          }
        });
      },
      error: (err) => {
        console.error('Order submission failed:', err);
        this.isSubmitting = false;
      }
    });
  }


  features = [
    'Instant Activation',
    'AI-Optimized Streaming',
    'Secured Payment Methods',
    'VPN Protection',
    'Worldwide Channels without geo-restrictions',
    'On-Demand Content',
    '4K & HD Quality',
    '24/7 Support'
  ];

  testimonials = [
    {
      text: '"I can watch the gaa on my phone, never had better streaming so chuffed tbh, worth every penny."',
      name: 'Joseph N',
      location: 'Ireland'
    },
    {
      text: '"customer service is sound, i had a small issue with setup and they sorted it in minutes"',
      name: 'Sarah M',
      location: 'Dublin'
    }
  ];

}

