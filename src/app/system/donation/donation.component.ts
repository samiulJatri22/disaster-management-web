import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface Donation {
  id: number;
  donorName: string;
  amount: number;
  date: string;
  paymentOption: string;
  mfsProvider?: string | null | undefined;
}

@Component({
  selector: 'app-system-donation',
  imports: [ReactiveFormsModule, FormsModule, MatPaginatorModule],
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
  providers: [DatePipe],
})
export class DonationComponent {
  donations: Donation[] = [
    {
      id: 1,
      donorName: 'John Doe',
      amount: 1000,
      date: '2024-12-01',
      paymentOption: 'CASH',
      mfsProvider: null,
    },
    {
      id: 2,
      donorName: 'Jane Smith',
      amount: 500,
      date: '2024-12-02',
      paymentOption: 'MFS',
      mfsProvider: 'BKASH',
    },
  ];

  donation: Donation = {
    id: 0,
    donorName: '',
    amount: 0,
    date: '',
    paymentOption: '',
  };
  isEditMode = false;

  totalItems = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  currentPage = 0;

  handleSubmit(): void {
    if (this.isEditMode) {
      const index = this.donations.findIndex((d) => d.id === this.donation.id);
      if (index !== -1) this.donations[index] = { ...this.donation };
    } else {
      const newId =
        this.donations.length > 0
          ? Math.max(...this.donations.map((d) => d.id)) + 1
          : 1;
      this.donations.push({ ...this.donation, id: newId });
    }
    this.resetForm();
  }

  editDonation(donation: Donation): void {
    this.donation = { ...donation };
    this.isEditMode = true;
  }

  deleteDonation(id: number): void {
    this.donations = this.donations.filter((d) => d.id !== id);
  }

  resetForm(): void {
    this.donation = {
      id: 0,
      donorName: '',
      amount: 0,
      date: '',
      paymentOption: '',
    };
    this.isEditMode = false;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
