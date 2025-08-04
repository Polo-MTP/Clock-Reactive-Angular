import { Component, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClockService, ClockColors } from './clock.service';

@Component({
  selector: 'app-clock-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="controls-container">
      <div class="button-group">
        <button 
          class="control-btn edit-btn" 
          (click)="toggleColorEditor()">
          ✏️ Editar Colores
        </button>
        
        <button 
          class="control-btn time-btn" 
          (click)="toggleTimeControls()">
          👁️ Controlar Tiempo
        </button>
      </div>
      
      <!-- Modal de Edición de Colores -->
      <div class="modal" *ngIf="showColorEditor()" (click)="closeModal($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Personalizar Colores del Reloj</h3>
          
          <div class="color-inputs">
            <div class="color-group">
              <label>Manecillas:</label>
              <input type="color" [(ngModel)]="tempColors.hands">
            </div>
            
            <div class="color-group">
              <label>Números:</label>
              <input type="color" [(ngModel)]="tempColors.numbers">
            </div>
            
            <div class="color-group">
              <label>Fondo del Reloj:</label>
              <input type="color" [(ngModel)]="tempColors.background">
            </div>
            
            <div class="color-group">
              <label>Rayitas/Marcas:</label>
              <input type="color" [(ngModel)]="tempColors.ticks">
            </div>
            
            <div class="color-group">
              <label>Fondo Hora Digital:</label>
              <input type="color" [(ngModel)]="tempColors.labelBackground">
            </div>
          </div>
          
          <div class="modal-buttons">
            <button class="save-btn" (click)="saveColors()">Guardar</button>
            <button class="cancel-btn" (click)="cancelColorEdit()">Cancelar</button>
          </div>
        </div>
      </div>
      
      <!-- Modal de Control de Tiempo -->
      <div class="modal" *ngIf="showTimeControls()" (click)="closeModal($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Control de Tiempo</h3>
          
          <div class="time-display">
            <div class="current-time">
              Hora Actual: {{ clockService.getCurrentTimeString(clockId) }}
            </div>
          </div>
          
          <div class="time-controls">
            <div class="control-row">
              <button class="time-control-btn" (click)="adjustTime(-1)">
                ⏪ Atrasar 1 Segundo
              </button>
              <span class="separator">|</span>
              <button class="time-control-btn" (click)="adjustTime(1)">
                Adelantar 1 Segundo ⏩
              </button>
            </div>
          </div>
          
          <div class="modal-buttons">
            <button class="close-btn" (click)="closeTimeControls()">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .controls-container {
      margin-top: 20px;
      text-align: center;
    }

    .button-group {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .control-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .edit-btn {
      background: #28a745;
      color: white;
    }

    .edit-btn:hover {
      background: #218838;
      transform: translateY(-2px);
    }

    .time-btn {
      background: #007bff;
      color: white;
    }

    .time-btn:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    }

    .modal-content h3 {
      margin-top: 0;
      margin-bottom: 25px;
      text-align: center;
      color: #333;
    }

    .color-inputs {
      display: grid;
      gap: 20px;
      margin-bottom: 25px;
    }

    .color-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .color-group label {
      font-weight: 600;
      color: #555;
    }

    .color-group input[type="color"] {
      width: 50px;
      height: 40px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .time-display {
      text-align: center;
      margin-bottom: 25px;
    }

    .current-time {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
    }

    .time-controls {
      margin-bottom: 25px;
    }

    .control-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }

    .time-control-btn {
      padding: 8px 16px;
      border: 2px solid #007bff;
      background: white;
      color: #007bff;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .time-control-btn:hover {
      background: #007bff;
      color: white;
    }

    .time-control-btn.fast {
      border-color: #dc3545;
      color: #dc3545;
    }

    .time-control-btn.fast:hover {
      background: #dc3545;
      color: white;
    }

    .separator {
      font-size: 18px;
      font-weight: bold;
      color: #666;
      margin: 0 10px;
    }

    .modal-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .save-btn, .close-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .save-btn {
      background: #28a745;
      color: white;
    }

    .save-btn:hover {
      background: #218838;
    }

    .cancel-btn {
      padding: 10px 20px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .cancel-btn:hover {
      background: #545b62;
    }

    .close-btn {
      background: #007bff;
      color: white;
    }

    .close-btn:hover {
      background: #0056b3;
    }

    @media (max-width: 640px) {
      .button-group {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      
      .control-btn {
        width: 100%;
        max-width: 250px;
      }
    }
  `]
})
export class ClockControlsComponent {
  @Input() clockId!: string;
  clockService = inject(ClockService);
  
  showColorEditor = signal(false);
  showTimeControls = signal(false);
  
  tempColors: ClockColors = {
    hands: '#000000',
    numbers: '#000000',
    background: '#ffffff',
    ticks: '#666666',
    labelBackground: '#f0f0f0'
  };

  toggleColorEditor(): void {
    this.tempColors = { ...this.clockService.getClockColors(this.clockId) };
    this.showColorEditor.set(true);
  }

  toggleTimeControls(): void {
    this.showTimeControls.set(true);
  }

  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.showColorEditor.set(false);
      this.showTimeControls.set(false);
    }
  }

  saveColors(): void {
    this.clockService.updateColors(this.clockId, this.tempColors);
    this.showColorEditor.set(false);
  }

  cancelColorEdit(): void {
    this.showColorEditor.set(false);
  }

  closeTimeControls(): void {
    this.showTimeControls.set(false);
  }

  adjustTime(seconds: number): void {
    this.clockService.adjustTime(this.clockId, seconds);
  }
}
