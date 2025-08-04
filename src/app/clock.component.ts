import { Component, computed, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockService } from './clock.service';
import { ClockModel } from './clock.model';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent {
  @Input() clockData!: ClockModel;
  clockService = inject(ClockService);

  clockColors = computed(() => {
    return this.clockService.getClockColors(this.clockData?.id || '');
  });

  hours = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180;
    return {
      x1: 150 + Math.cos(angle) * 130,
      y1: 150 + Math.sin(angle) * 130,
      x2: 150 + Math.cos(angle) * 115,
      y2: 150 + Math.sin(angle) * 115
    };
  });

  minutes = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 !== 0) {
      const angle = (i * 6 - 90) * Math.PI / 180;
      return {
        x1: 150 + Math.cos(angle) * 140,
        y1: 150 + Math.sin(angle) * 140,
        x2: 150 + Math.cos(angle) * 135,
        y2: 150 + Math.sin(angle) * 135
      };
    }
    return null;
  }).filter((minute): minute is { x1: number; y1: number; x2: number; y2: number } => minute !== null);

  numbers = Array.from({ length: 12 }, (_, i) => {
    const hour = i === 0 ? 12 : i;
    const angle = (i * 30 - 90) * Math.PI / 180;
    return {
      value: hour,
      x: 150 + Math.cos(angle) * 105,
      y: 150 + Math.sin(angle) * 105
    };
  });

  hourHandPosition = computed(() => {
    // Force reactivity by accessing the service's clocks signal
    const clocks = this.clockService.clocks();
    const currentClock = clocks.find(c => c.id === this.clockData?.id);
    if (!currentClock) return { x: 150, y: 150 };
    
    const hourAngle = ((currentClock.hours % 12) * 30 + currentClock.minutes * 0.5 - 90) * Math.PI / 180;
    return {
      x: 150 + Math.cos(hourAngle) * 60,
      y: 150 + Math.sin(hourAngle) * 60
    };
  });

  minuteHandPosition = computed(() => {
    // Force reactivity by accessing the service's clocks signal
    const clocks = this.clockService.clocks();
    const currentClock = clocks.find(c => c.id === this.clockData?.id);
    if (!currentClock) return { x: 150, y: 150 };
    
    const minuteAngle = (currentClock.minutes * 6 - 90) * Math.PI / 180;
    return {
      x: 150 + Math.cos(minuteAngle) * 80,
      y: 150 + Math.sin(minuteAngle) * 80
    };
  });

  secondHandPosition = computed(() => {
    // Force reactivity by accessing the service's clocks signal
    const clocks = this.clockService.clocks();
    const currentClock = clocks.find(c => c.id === this.clockData?.id);
    if (!currentClock) return { x: 150, y: 150 };
    
    const secondAngle = (currentClock.seconds * 6 - 90) * Math.PI / 180;
    return {
      x: 150 + Math.cos(secondAngle) * 100,
      y: 150 + Math.sin(secondAngle) * 100
    };
  });
}
