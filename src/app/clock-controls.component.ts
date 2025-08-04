import { Component, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClockService, ClockColors } from './clock.service';

@Component({
  selector: 'app-clock-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clock-controls.component.html',
  styleUrl: './clock-controls.component.css'
})
export class ClockControlsComponent {
  @Input() clockId!: string;
  clockService = inject(ClockService);
  
  showColorEditor = signal(false);
  showTimeControls = signal(false);
  
  currentColors: ClockColors = {
    hands: '#000000',
    numbers: '#000000',
    background: '#ffffff',
    ticks: '#666666',
    labelBackground: '#f0f0f0'
  };

  toggleColorEditor(): void {
    this.currentColors = { ...this.clockService.getClockColors(this.clockId) };
    this.showColorEditor.set(true);
  }

  updateColor(property: keyof ClockColors, event: Event): void {
    const newColor = (event.target as HTMLInputElement).value;
    this.currentColors = { ...this.currentColors, [property]: newColor };
    this.clockService.updateColors(this.clockId, this.currentColors);
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

  closeColorEditor(): void {
    this.showColorEditor.set(false);
  }


  closeTimeControls(): void {
    this.showTimeControls.set(false);
  }

  adjustTime(seconds: number): void {
    this.clockService.adjustTime(this.clockId, seconds);
  }
}
