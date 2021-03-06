import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './_services/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pressState: string;
  progress: any;
  constructor(private router: Router, public globalService: GlobalService) {

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
