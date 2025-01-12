import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-system-admin',
  imports: [ReactiveFormsModule, FormsModule, MatPaginatorModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john.doe@example.com',
      password: '********',
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '+0987654321',
      email: 'jane.smith@example.com',
      password: '********',
    },
  ];

  totalItems = 50;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 0;

  isEditMode = false;
  currentUser: User = this.resetUser();

  resetUser(): User {
    return {
      id: 0,
      name: '',
      phone: '',
      email: '',
      password: '',
    };
  }

  // Add or update user
  handleSubmit() {
    if (this.isEditMode) {
      const index = this.users.findIndex(
        (user) => user.id === this.currentUser.id
      );
      if (index !== -1) {
        this.users[index] = { ...this.currentUser, password: '********' };
      }
    } else {
      this.currentUser.id = this.users.length + 1; // Simulate ID
      this.users.push({ ...this.currentUser, password: '********' });
    }

    this.currentUser = this.resetUser();
    this.isEditMode = false;
  }

  // Edit user
  editUser(user: User) {
    this.currentUser = { ...user, password: '' }; // Password must be re-entered
    this.isEditMode = true;
  }

  // Delete user
  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
