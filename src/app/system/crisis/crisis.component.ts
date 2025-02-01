import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CrisisService } from '../../common';

export interface Crisis {
  _id: string;
  title: string;
  description: string;
  address: string;
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
  crisisForm: FormGroup;
  crises: Crisis[] = [];
  isEditMode = false;
  selectedCrisisId: string | null = null;

  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  currentPage = 0;

  constructor(private fb: FormBuilder, private crisisService: CrisisService) {
    this.crisisForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      severity: ['MEDIUM', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCrises();
  }

  loadCrises(): void {
    this.crisisService
      .get({ page: this.currentPage + 1, limit: this.pageSize })
      .subscribe((response: any) => {
        this.crises = response.docs;
        this.totalItems = response.totalDocs;
      });
  }

  handleSubmit(): void {
    if (this.crisisForm.invalid) return;

    if (this.isEditMode && this.selectedCrisisId) {
      this.crisisService
        .update({ _id: this.selectedCrisisId, ...this.crisisForm.value })
        .subscribe(() => {
          this.loadCrises();
          this.resetForm();
        });
    } else {
      this.crisisService.create(this.crisisForm.value).subscribe(() => {
        this.loadCrises();
        this.resetForm();
      });
    }
  }

  editCrisis(crisis: Crisis): void {
    this.isEditMode = true;
    this.selectedCrisisId = crisis._id;
    const formattedDate = new Date(crisis.date).toISOString().split('T')[0];

    this.crisisForm.patchValue({ ...crisis, date: formattedDate });
  }

  deleteCrisis(id: string): void {
    this.crisisService.remove(id.toString()).subscribe(() => {
      this.loadCrises();
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedCrisisId = null;
    this.crisisForm.reset({ severity: 'MEDIUM' });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCrises();
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
