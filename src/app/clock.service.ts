import { Injectable, signal, effect } from '@angular/core';
import { ClockModel } from './clock.model';

export interface ClockColors {
  hands: string;
  numbers: string;
  background: string;
  ticks: string;
  labelBackground: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private _clocks = signal<ClockModel[]>([]);
  private _colors = signal<Map<string, ClockColors>>(new Map());
  private intervalId: any = null;

  clocks = this._clocks.asReadonly();
  colors = this._colors.asReadonly();

  private defaultColors: ClockColors = {
    hands: '#000000',
    numbers: '#000000',
    background: '#ffffff',
    ticks: '#666666',
    labelBackground: '#f0f0f0'
  };

  constructor() {
    this.startAllClocks();
  }

  createClock(hours: number, minutes: number, seconds: number): void {
    const clock = new ClockModel(hours, minutes, seconds);
    const currentClocks = this._clocks();
    this._clocks.set([...currentClocks, clock]);
    
    // Set default colors for the new clock
    const currentColors = this._colors();
    currentColors.set(clock.id, { ...this.defaultColors });
    this._colors.set(new Map(currentColors));
  }

  getClockColors(clockId: string): ClockColors {
    return this._colors().get(clockId) || this.defaultColors;
  }

  updateColors(clockId: string, colors: ClockColors): void {
    const currentColors = this._colors();
    currentColors.set(clockId, colors);
    this._colors.set(new Map(currentColors));
  }

  adjustTime(clockId: string, seconds: number): void {
    const currentClocks = this._clocks();
    const clockIndex = currentClocks.findIndex(c => c.id === clockId);
    
    if (clockIndex !== -1) {
      const currentClock = currentClocks[clockIndex];
      const updatedClock = new ClockModel(currentClock.hours, currentClock.minutes, currentClock.seconds);
      updatedClock.id = currentClock.id; // Preserve the original ID
      updatedClock.adjustTime(seconds);
      
      const newClocks = [...currentClocks];
      newClocks[clockIndex] = updatedClock;
      this._clocks.set(newClocks);
    }
  }

  removeClock(clockId: string): void {
    const currentClocks = this._clocks();
    const filteredClocks = currentClocks.filter(c => c.id !== clockId);
    this._clocks.set(filteredClocks);
    
    const currentColors = this._colors();
    currentColors.delete(clockId);
    this._colors.set(new Map(currentColors));
  }

  private startAllClocks(): void {
    this.intervalId = setInterval(() => {
      const currentClocks = this._clocks();
      if (currentClocks.length > 0) {
        const updatedClocks = currentClocks.map(clock => {
          const updatedClock = new ClockModel(clock.hours, clock.minutes, clock.seconds);
          updatedClock.id = clock.id; // Preserve the original ID
          updatedClock.adjustTime(1);
          return updatedClock;
        });
        this._clocks.set(updatedClocks);
      }
    }, 1000);
  }

  getCurrentTimeString(clockId: string): string {
    const clock = this._clocks().find(c => c.id === clockId);
    if (!clock) return '00:00:00';
    
    const hours = clock.hours.toString().padStart(2, '0');
    const minutes = clock.minutes.toString().padStart(2, '0');
    const seconds = clock.seconds.toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  }

  // Backward compatibility methods
  clock() {
    const clocks = this._clocks();
    return clocks.length > 0 ? clocks[0] : null;
  }
}
