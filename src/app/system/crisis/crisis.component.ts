import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface Crisis {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

@Component({
  selector: 'app-system-crisis',
  imports: [ReactiveFormsModule, FormsModule, MatPaginatorModule],
  templateUrl: './crisis.component.html',
  styleUrls: ['./crisis.component.scss'],
})
export class CrisisComponent {
  crises: Crisis[] = [
    {
      id: 1,
      title: 'Flood in City A',
      description: 'Severe flooding due to heavy rainfall.',
      location: 'City A',
      date: '2024-12-01',
      severity: 'HIGH',
    },
    {
      id: 2,
      title: 'Earthquake in Region B',
      description: '5.6 magnitude earthquake caused destruction.',
      location: 'Region B',
      date: '2024-11-28',
      severity: 'MEDIUM',
    },
  ];

  totalItems = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  currentPage = 0;

  isEditMode = false;
  currentCrisis: Crisis = this.resetCrisis();

  // Reset crisis form
  resetCrisis(): Crisis {
    return {
      id: 0,
      title: '',
      description: '',
      location: '',
      date: '',
      severity: 'MEDIUM',
    };
  }

  // Add or update crisis
  handleSubmit() {
    if (this.isEditMode) {
      const index = this.crises.findIndex(
        (c) => c.id === this.currentCrisis.id
      );
      if (index !== -1) {
        this.crises[index] = { ...this.currentCrisis };
      }
    } else {
      this.currentCrisis.id = this.crises.length + 1; // Simulate ID
      this.crises.push({ ...this.currentCrisis });
    }

    this.currentCrisis = this.resetCrisis();
    this.isEditMode = false;
  }

  // Edit crisis
  editCrisis(crisis: Crisis) {
    this.currentCrisis = { ...crisis };
    this.isEditMode = true;
  }

  // Delete crisis
  deleteCrisis(id: number) {
    this.crises = this.crises.filter((crisis) => crisis.id !== id);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
