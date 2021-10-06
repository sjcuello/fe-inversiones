import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'shared-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'indeterminate';

}
