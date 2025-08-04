import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockService } from './clock.service';
import { ClockModel } from './clock.model';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clock-container" *ngIf="clockData">
      <div class="digital-display" [style.background-color]="clockColors().labelBackground">
        {{ clockService.getCurrentTimeString(clockData.id) }}
      </div>
      
      <svg class="analog-clock" width="300" height="300" viewBox="0 0 300 300">
        <!-- Clock background -->
        <circle cx="150" cy="150" r="145" 
                [attr.fill]="clockColors().background" 
                stroke="#ccc" stroke-width="2"/>
        
        <!-- Hour markers -->
        <g [attr.stroke]="clockColors().ticks" stroke-width="3">
          <line *ngFor="let hour of hours" 
                [attr.x1]="hour.x1" [attr.y1]="hour.y1" 
                [attr.x2]="hour.x2" [attr.y2]="hour.y2"/>
        </g>
        
        <!-- Minute markers -->
        <g [attr.stroke]="clockColors().ticks" stroke-width="1">
          <line *ngFor="let minute of minutes" 
                [attr.x1]="minute.x1" [attr.y1]="minute.y1" 
                [attr.x2]="minute.x2" [attr.y2]="minute.y2"/>
        </g>
        
        <!-- Numbers -->
        <g [attr.fill]="clockColors().numbers" font-family="Arial" font-size="20" text-anchor="middle">
          <text *ngFor="let number of numbers" 
                [attr.x]="number.x" [attr.y]="number.y" dominant-baseline="middle">
            {{ number.value }}
          </text>
        </g>
        
        <!-- Clock hands -->
        <g [attr.stroke]="clockColors().hands" stroke-linecap="round">
          <!-- Hour hand -->
          <line x1="150" y1="150" 
                [attr.x2]="hourHandPosition().x" 
                [attr.y2]="hourHandPosition().y" 
                stroke-width="6"/>
          
          <!-- Minute hand -->
          <line x1="150" y1="150" 
                [attr.x2]="minuteHandPosition().x" 
                [attr.y2]="minuteHandPosition().y" 
                stroke-width="4"/>
          
          <!-- Second hand -->
          <line x1="150" y1="150" 
                [attr.x2]="secondHandPosition().x" 
                [attr.y2]="secondHandPosition().y" 
                stroke="#ff0000" stroke-width="2"/>
        </g>
        
        <!-- Center dot -->
        <circle cx="150" cy="150" r="8" [attr.fill]="clockColors().hands"/>
      </svg>
    </div>
  `,
  styles: [`
    .clock-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
    }

    .digital-display {
      font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
      font-size: 1.25rem;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      color: #1e293b;
      text-align: center;
      min-width: 140px;
      background: #f8fafc;
      letter-spacing: 0.05em;
    }

    .analog-clock {
      border-radius: 50%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
      background: white;
    }
  `]
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
