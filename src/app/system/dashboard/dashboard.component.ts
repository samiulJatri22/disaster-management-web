import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'system-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [ReactiveFormsModule, FormsModule],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = new Date().toISOString().split('T')[0];
  totalCrises: number = 45;
  totalFund: number = 23000;
  totalRelief: number = 15000;
  newVolunteers: number = 12;
  recentActivities = [
    {
      _id: `1`,
      description: 'New crisis reported: "Flood in Sylhet"',
      time: '2 hours ago',
    },
    {
      _id: '2',
      description: 'Donation received: $500 by John Doe',
      time: '5 hours ago',
    },
    {
      _id: '3',
      description: 'Relief sent to: "Chattogram Region"',
      time: '8 hours ago',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderDonationTrendsChart();
    this.renderCrisisSeverityChart();
  }

  applyDateRange(): void {
    console.log('Date range applied:', this.startDate, this.endDate);
  }

  renderDonationTrendsChart(): void {
    const ctx = document.getElementById(
      'donationTrendsChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Donations ($)',
            data: [500, 700, 800, 600, 1200],
            backgroundColor: '#4CAF50',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }

  renderCrisisSeverityChart(): void {
    const ctx = document.getElementById(
      'crisisSeverityChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Flood', 'Cyclone', 'Earthquake'],
        datasets: [
          {
            data: [40, 30, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
}
