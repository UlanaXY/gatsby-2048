import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: 'app/app.component.html',
})

class AppComponent {
  value = 0;

  constructor() { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp'
      || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.move(event);
    }
  }
}
