import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-system',
  imports: [RouterOutlet],
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SystemComponent {
  prepareRoute(outlet: RouterOutlet): boolean {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('accessToken'); // Remove token
    localStorage.removeItem('profile'); // Remove token
    this.router.navigate(['/login']); // Redirect to login
  }
}
