import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClockService } from './clock.service';

@Component({
  selector: 'app-clock-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clock-form.component.html',
  styleUrl: './clock-form.component.css'
})
export class ClockFormComponent {
  clockService = inject(ClockService);
  
  hours: number = new Date().getHours();
  minutes: number = new Date().getMinutes();
  seconds: number = new Date().getSeconds();

  onSubmit(): void {
    this.clockService.createClock(this.hours, this.minutes, this.seconds);
  }
}
