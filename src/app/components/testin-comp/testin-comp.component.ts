import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-testin-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testin-comp.component.html',
  styleUrl: './testin-comp.component.css'
})
export class TestinCompComponent {
  

  
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
}
