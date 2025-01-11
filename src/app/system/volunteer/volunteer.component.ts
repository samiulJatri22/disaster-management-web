import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

export enum Availability {
  PART_TIME = 'PART_TIME',
  FULL_TIME = 'FULL_TIME',
}

export interface Volunteer {
  id: number;
  name: string;
  contact: string;
  emergencyContact: string;
  address?: string;
  profession: string;
  dob: Date;
  skill: string[];
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
  volunteers: Volunteer[] = [
    {
      id: 1,
      name: 'Tanvir Ahmed',
      contact: '+8801712345678',
      emergencyContact: '+8801912345678',
      address: 'House-12, Road-5, Dhanmondi, Dhaka',
      profession: 'Engineer',
      dob: new Date('1990-05-15'),
      skill: ['First Aid', 'Logistics Management'],
      bloodGroup: 'OP',
      availability: Availability.FULL_TIME,
      status: true,
    },
    {
      id: 2,
      name: 'Ayesha Rahman',
      contact: '+8801623456789',
      emergencyContact: '+8801923456789',
      address: 'Flat-3B, Gulshan Avenue, Dhaka',
      profession: 'Doctor',
      dob: new Date('1988-03-22'),
      skill: ['Medical Assistance', 'Psychological Support'],
      bloodGroup: 'AP',
      availability: Availability.PART_TIME,
      status: false,
    },
  ];

  totalItems = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  currentPage = 0;

  isEditMode = false;
  currentVolunteer: Volunteer = this.resetVolunteer();

  resetVolunteer(): Volunteer {
    return {
      id: 0,
      name: '',
      contact: '',
      emergencyContact: '',
      address: '',
      profession: '',
      dob: new Date(), // Default to today's date
      skill: [],
      bloodGroup: 'OP', // Default blood group
      availability: Availability.FULL_TIME, // Default availability
      status: true, // Default to active
    };
  }

  // Add or update volunteer
  handleSubmit() {
    if (this.isEditMode) {
      const index = this.volunteers.findIndex(
        (v) => v.id === this.currentVolunteer.id
      );
      if (index !== -1) {
        this.volunteers[index] = { ...this.currentVolunteer };
      }
    } else {
      this.currentVolunteer.id = this.volunteers.length + 1; // Simulate ID
      this.volunteers.push({ ...this.currentVolunteer });
    }

    this.currentVolunteer = this.resetVolunteer();
    this.isEditMode = false;
  }

  // Edit volunteer
  editVolunteer(volunteer: Volunteer) {
    this.currentVolunteer = { ...volunteer };
    this.isEditMode = true;
  }

  // Delete volunteer
  deleteVolunteer(id: number) {
    this.volunteers = this.volunteers.filter(
      (volunteer) => volunteer.id !== id
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
