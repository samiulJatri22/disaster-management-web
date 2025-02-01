import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DonationService } from '../../common';

export interface Donation {
  _id: string;
  name: string;
  phone: string;
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
  donationForm!: FormGroup;
  donations: Donation[] = [];
  isEditMode = false;
  selectedDonationId: string | null = null;

  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  currentPage = 0;

  constructor(
    private fb: FormBuilder,
    private donationService: DonationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDonations();
  }

  initForm(): void {
    this.donationForm = this.fb.group({
      date: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      amount: [null, [Validators.required, Validators.min(1)]],
      paymentOption: ['', Validators.required],
      mfsProvider: [''],
    });

    this.donationForm
      .get('paymentOption')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'MFS') {
          this.donationForm
            .get('mfsProvider')
            ?.setValidators([Validators.required]);
        } else {
          this.donationForm.get('mfsProvider')?.clearValidators();
        }
        this.donationForm.get('mfsProvider')?.updateValueAndValidity();
      });
  }

  loadDonations(): void {
    this.donationService
      .get({ page: this.currentPage + 1, limit: this.pageSize })
      .subscribe((response: any) => {
        this.donations = response.docs;
        this.totalItems = response.totalDocs;
      });
  }

  handleSubmit(): void {
    if (this.donationForm.invalid) return;

    const donationData = this.donationForm.value;

    if (this.isEditMode && this.selectedDonationId) {
      this.donationService
        .update({ _id: this.selectedDonationId, ...donationData })
        .subscribe(() => {
          this.loadDonations();
          this.resetForm();
        });
    } else {
      this.donationService.create(donationData).subscribe(() => {
        this.loadDonations();
        this.resetForm();
      });
    }
  }

  editDonation(donation: Donation): void {
    const formattedDate = new Date(donation.date).toISOString().split('T')[0];
    this.donationForm.patchValue({ ...donation, date: formattedDate });
    this.selectedDonationId = donation._id;
    this.isEditMode = true;
  }

  deleteDonation(id: string): void {
    this.donationService.remove(id).subscribe(() => {
      this.loadDonations();
    });
  }

  resetForm(): void {
    this.donationForm.reset();
    this.isEditMode = false;
    this.selectedDonationId = null;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDonations();
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }
}
