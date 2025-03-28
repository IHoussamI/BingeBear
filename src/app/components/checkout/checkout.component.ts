import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  
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

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: ['', Validators.required],
      country: ['Ireland'],
      city: [''],
      phone: ['', Validators.required],
      paymentMethod: ['creditCard', Validators.required] // Added payment method field

    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form submitted:', this.checkoutForm.value);
      // Add your checkout logic here
    } else {
      this.markFormGroupTouched(this.checkoutForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

