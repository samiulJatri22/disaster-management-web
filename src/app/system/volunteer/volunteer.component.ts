import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface Volunteer {
  id: number;
  name: string;
  contact: string;
  location: string;
  role: string;
  availability: string;
}

@Component({
  selector: 'app-system-volunteer',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent {
  volunteers: Volunteer[] = [
    {
      id: 1,
      name: 'John Doe',
      contact: '123-456-7890',
      location: 'City A',
      role: 'First Aid Provider',
      availability: 'Full-Time',
    },
    {
      id: 2,
      name: 'Jane Smith',
      contact: '987-654-3210',
      location: 'Region B',
      role: 'Logistics Coordinator',
      availability: 'Part-Time',
    },
  ];

  currentPage = 1;
  itemsPerPage = 5;

  isEditMode = false;
  currentVolunteer: Volunteer = this.resetVolunteer();

  // Reset volunteer form
  resetVolunteer(): Volunteer {
    return {
      id: 0,
      name: '',
      contact: '',
      location: '',
      role: '',
      availability: 'Full-Time',
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

  // Pagination logic
  getPaginatedVolunteers(): Volunteer[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.volunteers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Change page
  changePage(page: number) {
    this.currentPage = page;
  }
}
