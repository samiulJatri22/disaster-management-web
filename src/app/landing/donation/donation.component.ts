import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-donation',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss',
})
export class SelfDonationComponent {
  donation = {
    name: '',
    email: '',
    phone: '',
    amount: 0,
    paymentOption: '',
    mfsProvider: '',
    message: '',
  };

  // Method to handle form submission
  submitDonation() {
    if (this.donation.paymentOption === 'MFS' && !this.donation.mfsProvider) {
      alert('Please select an MFS provider.');
      return;
    }

    // Simulate processing donation
    console.log('Donation details submitted:', this.donation);

    // Show success message or redirect user after successful submission
    alert(`Thank you, ${this.donation.name}, for your donation!`);

    // Reset form
    this.donation = {
      name: '',
      email: '',
      phone: '',
      amount: 0,
      paymentOption: '',
      mfsProvider: '',
      message: '',
    };
  }
}
