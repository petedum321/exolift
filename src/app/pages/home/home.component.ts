import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

interface Walk {
  date: string;
  distance: number; // km
  time: number; // minutes
  avgSpeed: number; // km/h
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  selectedOption: 'time' | 'distance' = 'time';
  inputValue: number | null = null;

  displayedColumns = ['date', 'distance', 'time', 'avgSpeed'];

  walks: Walk[] = [
    { date: '2025-05-01', distance: 3.2, time: 30, avgSpeed: 6.4 },
    { date: '2025-05-03', distance: 5, time: 50, avgSpeed: 6 },
  ];

  constructor(private router: Router) {}

  startWalk() {
    if (!this.inputValue || this.inputValue <= 0) return;
    this.router.navigate(['/walk'], {
      queryParams: {
        mode: this.selectedOption,
        value: this.inputValue
      }
    });
  }
}
