import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-box',
  imports: [],
  templateUrl: './preview-box.component.html',
  styleUrl: './preview-box.component.scss',
})
export class PreviewBoxComponent {
  @Input() color = '';
}
