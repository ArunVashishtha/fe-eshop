import { Component, OnInit } from '@angular/core';
import { loadScript } from './../../core/utils/common'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() {
    loadScript('https://shop.azelab.com/js/jquery.knob.js');
    loadScript('https://shop.azelab.com/js/timer.js');
  }

  ngOnInit(): void {
  }

}
