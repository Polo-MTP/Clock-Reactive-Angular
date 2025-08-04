import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClockService } from './clock.service';

@Component({
  selector: 'app-clock-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>Crear Reloj</h2>
      <form (ngSubmit)="onSubmit()" #clockForm="ngForm">
        <div class="form-group">
          <label for="hours">Horas:</label>
          <input 
            type="number" 
            id="hours" 
            name="hours"
            [(ngModel)]="hours" 
            min="0" 
            max="23" 
            required>
        </div>
        
        <div class="form-group">
          <label for="minutes">Minutos:</label>
          <input 
            type="number" 
            id="minutes" 
            name="minutes"
            [(ngModel)]="minutes" 
            min="0" 
            max="59" 
            required>
        </div>
        
        <div class="form-group">
          <label for="seconds">Segundos:</label>
          <input 
            type="number" 
            id="seconds" 
            name="seconds"
            [(ngModel)]="seconds" 
            min="0" 
            max="59" 
            required>
        </div>
        
        <button 
          type="submit" 
          [disabled]="!clockForm.valid"
          class="submit-btn">
          Crear Reloj
        </button>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
      border: 1px solid #e2e8f0;
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      text-align: center;
      color: #1e293b;
      margin-bottom: 32px;
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: -0.025em;
    }

    form {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      align-items: end;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    input {
      padding: 12px 16px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.2s ease;
      background: #ffffff;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input:invalid {
      border-color: #ef4444;
    }

    .submit-btn {
      padding: 12px 24px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      height: fit-content;
    }

    .submit-btn:hover:not(:disabled) {
      background: #2563eb;
      transform: translateY(-1px);
    }

    .submit-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 640px) {
      .form-container {
        padding: 24px;
      }
      
      form {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .submit-btn {
        width: 100%;
      }
    }
  `]
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
