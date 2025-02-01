import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../common';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
}

@Component({
  selector: 'app-system-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [AdminService],
  imports: [FormsModule, ReactiveFormsModule, MatPaginatorModule],
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 0;
  isEditMode = false;
  userForm!: FormGroup;
  selectedUserId: string | null = null;

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadUsers();
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  loadUsers() {
    this.adminService
      .get({ page: this.currentPage + 1, limit: this.pageSize })
      .subscribe((res: any) => {
        this.users = res.docs;
        this.totalItems = res.totalDocs;
      });
  }

  handleCreate() {
    if (this.userForm.invalid) return;

    const formData = this.userForm.value;

    this.adminService.create(formData).subscribe(() => {
      this.loadUsers();
      this.resetForm();
    });
  }

  handleUpdate() {
    const { password, ...formData } = this.userForm.value;

    this.adminService
      .update({ _id: this.selectedUserId, ...formData })
      .subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
  }

  editUser(user: User) {
    this.isEditMode = true;
    this.selectedUserId = user._id;
    this.userForm.patchValue({
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.remove(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  resetForm() {
    this.userForm.reset();
    this.isEditMode = false;
    this.selectedUserId = null;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }
}
