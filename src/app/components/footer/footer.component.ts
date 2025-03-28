import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {

}
