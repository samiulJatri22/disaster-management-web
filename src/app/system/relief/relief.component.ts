import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface Relief {
  id: number;
  item: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  location: string;
  date: string;
}

@Component({
  selector: 'app-system-relief',
  imports: [ReactiveFormsModule, FormsModule, MatPaginatorModule],
  templateUrl: './relief.component.html',
  styleUrls: ['./relief.component.scss'],
})
export class ReliefComponent {
  reliefs: Relief[] = [
    {
      id: 1,
      item: 'Rice',
      quantity: 100,
      unitValue: 50,
      totalValue: 5000,
      location: 'Village A',
      date: '2024-12-01',
    },
    {
      id: 2,
      item: 'Blankets',
      quantity: 50,
      unitValue: 300,
      totalValue: 15000,
      location: 'Village B',
      date: '2024-12-02',
    },
  ];

  totalItems = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  currentPage = 0;

  isEditMode = false;
  currentRelief: Relief = this.resetRelief();

  // Reset relief form
  resetRelief(): Relief {
    return {
      id: 0,
      item: '',
      quantity: 0,
      unitValue: 0,
      totalValue: 0,
      location: '',
      date: '',
    };
  }

  // Calculate total value
  calculateTotalValue() {
    this.currentRelief.totalValue =
      this.currentRelief.quantity * this.currentRelief.unitValue;
  }

  // Add or update relief
  handleSubmit() {
    this.calculateTotalValue();
    if (this.isEditMode) {
      const index = this.reliefs.findIndex(
        (r) => r.id === this.currentRelief.id
      );
      if (index !== -1) {
        this.reliefs[index] = { ...this.currentRelief };
      }
    } else {
      this.currentRelief.id = this.reliefs.length + 1; // Simulate ID
      this.reliefs.push({ ...this.currentRelief });
    }

    this.currentRelief = this.resetRelief();
    this.isEditMode = false;
  }

  // Edit relief
  editRelief(relief: Relief) {
    this.currentRelief = { ...relief };
    this.isEditMode = true;
  }

  // Delete relief
  deleteRelief(id: number) {
    this.reliefs = this.reliefs.filter((relief) => relief.id !== id);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
