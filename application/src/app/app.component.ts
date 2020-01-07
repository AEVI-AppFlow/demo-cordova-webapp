import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppFlow WebApp Demonstrator';
  currentSection: string = localStorage.getItem('currentSection') || "home";

  public setSection(section: string) {
    this.currentSection = section;
    localStorage.setItem('currentSection', section);
  }
}
