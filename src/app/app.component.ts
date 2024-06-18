import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'libraryCrud';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= false;
  isCollapsed = false;

  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
      this.isCollapsed = this.isMobile;
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
    } else {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    }
  }

  closeSidenav() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }
}
