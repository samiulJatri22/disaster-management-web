import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReliefService } from '../../common';

export interface Relief {
  _id: string;
  name: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  address: string;
  date: string;
}

@Component({
  selector: 'app-system-relief',
  imports: [ReactiveFormsModule, FormsModule, MatPaginatorModule],
  templateUrl: './relief.component.html',
  styleUrls: ['./relief.component.scss'],
})
export class ReliefComponent {
  reliefForm: FormGroup;
  reliefs: Relief[] = [];
  isEditMode = false;
  selectedReliefId: string | null = null;

  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  currentPage = 0;

  constructor(private fb: FormBuilder, private reliefService: ReliefService) {
    this.reliefForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unitValue: [0, [Validators.required, Validators.min(1)]],
      totalValue: [{ value: 0, disabled: true }, Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchReliefs();
    this.reliefForm.valueChanges.subscribe(() => this.calculateTotalValue());
  }

  fetchReliefs() {
    this.reliefService
      .get({ page: this.currentPage + 1, limit: this.pageSize })
      .subscribe((response: any) => {
        this.reliefs = response.docs;
        this.totalItems = response.totalDocs;
      });
  }

  calculateTotalValue() {
    const quantity = this.reliefForm.get('quantity')?.value || 0;
    const unitValue = this.reliefForm.get('unitValue')?.value || 0;
    this.reliefForm.patchValue(
      { totalValue: quantity * unitValue },
      { emitEvent: false }
    );
  }

  handleSubmit() {
    if (this.reliefForm.invalid) return;

    const formData: Relief = this.reliefForm.getRawValue();

    if (this.isEditMode && this.selectedReliefId) {
      this.reliefService
        .update({ ...formData, _id: this.selectedReliefId })
        .subscribe(() => {
          this.isEditMode = false;
          this.selectedReliefId = null;
          this.reliefForm.reset();
          this.fetchReliefs();
        });
    } else {
      this.reliefService.create(formData).subscribe(() => {
        this.reliefForm.reset();
        this.fetchReliefs();
      });
    }
  }

  editRelief(relief: Relief) {
    this.isEditMode = true;
    this.selectedReliefId = relief._id || null;
    const formattedDate = new Date(relief.date).toISOString().split('T')[0];
    this.reliefForm.patchValue({ ...relief, date: formattedDate });
  }

  deleteRelief(id: string) {
    this.reliefService.remove(id).subscribe(() => {
      this.fetchReliefs();
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchReliefs();
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
