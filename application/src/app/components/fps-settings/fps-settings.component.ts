import { Component, OnInit, Input } from '@angular/core';
import { FpsSettings } from 'appflow-payment-initiation-api';

@Component({
  selector: 'av-fps-settings',
  templateUrl: './fps-settings.component.html',
  styleUrls: ['./fps-settings.component.scss']
})
export class FpsSettingsComponent implements OnInit {

  @Input() fpsSettings: FpsSettings;

  constructor() { }

  ngOnInit() {
  }

}
