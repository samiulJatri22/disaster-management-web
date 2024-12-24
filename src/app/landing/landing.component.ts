import { Component } from '@angular/core';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  recentCrises = [
    {
      id: '1',
      title: 'Flood in Dhaka',
      location: 'Dhaka, Bangladesh',
      severity: 'High',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      title: 'Cyclone in Chittagong',
      location: 'Chittagong, Bangladesh',
      severity: 'Medium',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      title: 'Earthquake in Sylhet',
      location: 'Sylhet, Bangladesh',
      severity: 'Critical',
      image: 'https://via.placeholder.com/150',
    },
  ];

  volunteers = [
    {
      id: '1',
      name: 'John Doe',
      contact: '+8801234567890',
    },
    {
      id: '1',
      name: 'Jane Smith',
      contact: '+8809876543210',
    },
    {
      id: '1',
      name: 'Rahim Uddin',
      contact: '+8801928374650',
    },
  ];
}
