import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pressState: string;
  progress: any;
  constructor(private router: Router) {
    if (!window.localStorage.getItem("user")) {
      this.router.navigate(['/login']);
    }
  }
  active() {
    console.log("pressss")
  }
  // Interval function
  protected interval: any;

  onPress($event) {
    console.log('onPress', $event);
    this.startInterval();
  }

  onPressUp($event) {
    console.log('onPressUp', $event);
    this.stopInterval();
  }

  startInterval() {
    const self = this;
    this.interval = setInterval(function () {
      self.progress = self.progress + 1;
    }, 50);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

}
