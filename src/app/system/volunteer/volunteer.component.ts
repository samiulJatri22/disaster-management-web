import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { VolunteerService } from '../../common';

export enum Availability {
  PART_TIME = 'PART_TIME',
  FULL_TIME = 'FULL_TIME',
}

export interface Volunteer {
  _id: string;
  name: string;
  contact: string;
  emergencyContact: string;
  address?: string;
  profession: string;
  dob: Date;
  skills: string[];
  bloodGroup: string;
  availability: Availability;
  status: boolean;
}

@Component({
  selector: 'app-system-volunteer',
  imports: [ReactiveFormsModule, FormsModule, MatPaginatorModule],
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent {
  volunteerForm: FormGroup;
  volunteers: Volunteer[] = [];
  isEditMode = false;
  selectedVolunteerId: string | null = null;

  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  currentPage = 0;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService
  ) {
    this.volunteerForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      address: [''],
      profession: ['', Validators.required],
      dob: ['', Validators.required],
      skills: ['', Validators.required],
      bloodGroup: ['OP', Validators.required],
      availability: [Availability.FULL_TIME, Validators.required],
      status: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadVolunteers();
  }

  loadVolunteers(): void {
    // Adjust the API call as needed for your backend's pagination
    this.volunteerService
      .get({ page: this.currentPage + 1, limit: this.pageSize })
      .subscribe((response: any) => {
        this.volunteers = response.docs;
        this.totalItems = response.totalDocs;
      });
  }

  handleSubmit(): void {
    if (this.volunteerForm.invalid) return;

    // Convert comma-separated skills string to an array
    const formValue = this.volunteerForm.value;
    const volunteerData: Volunteer = {
      ...formValue,
      // skill: formValue.skill.split(',').map((s: string) => s.trim()),
    };

    if (this.isEditMode && this.selectedVolunteerId) {
      volunteerData._id = this.selectedVolunteerId;
      this.volunteerService.update(volunteerData).subscribe(() => {
        this.loadVolunteers();
        this.resetForm();
      });
    } else {
      this.volunteerService.create(volunteerData).subscribe(() => {
        this.loadVolunteers();
        this.resetForm();
      });
    }
  }

  editVolunteer(volunteer: Volunteer): void {
    this.isEditMode = true;
    this.selectedVolunteerId = volunteer._id || null;
    const formattedDate = new Date(volunteer.dob).toISOString().split('T')[0];
    // Convert skills array into a comma-separated string for display in the input
    this.volunteerForm.patchValue({ ...volunteer, dob: formattedDate });
  }

  deleteVolunteer(id: string): void {
    if (confirm('Are you sure you want to delete this volunteer?')) {
      this.volunteerService.remove(id).subscribe(() => {
        this.loadVolunteers();
      });
    }
  }

  resetForm(): void {
    this.volunteerForm.reset({
      name: '',
      contact: '',
      emergencyContact: '',
      address: '',
      profession: '',
      dob: '',
      skill: '',
      bloodGroup: 'OP',
      availability: Availability.FULL_TIME,
      status: true,
    });
    this.isEditMode = false;
    this.selectedVolunteerId = null;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadVolunteers();
  }
}
