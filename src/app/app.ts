import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock.component';
import { ClockFormComponent } from './clock-form.component';
import { ClockControlsComponent } from './clock-controls.component';
import { ClockService } from './clock.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ClockComponent, ClockFormComponent, ClockControlsComponent],
  providers: [ClockService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Reloj-Angular';
  clockService = inject(ClockService);

  trackClockById(index: number, clock: any): string {
    return clock.id;
  }
}
