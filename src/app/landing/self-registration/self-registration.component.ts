import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-self-registration',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './self-registration.component.html',
  styleUrl: './self-registration.component.scss',
})
export class SelfRegistrationComponent {
  newVolunteer = {
    name: '',
    email: '',
    contact: '',
    address: '',
    dob: '',
    bloodGroup: '',
    profession: '',
    skills: '',
    availability: '',
  };

  // Handler for form submission
  handleSelfRegistration() {
    // You can replace the following line with your service call to save the volunteer data
    console.log('Volunteer Registration Successful', this.newVolunteer);

    // Optionally, reset the form after successful submission
    alert('Thank you for registering as a volunteer!');
  }
}
