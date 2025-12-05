import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-color-selector',
  imports: [],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.scss',
})
export class ColorSelectorComponent {
  @Output() colorSelected = new EventEmitter<string>();
  defaultColor = input<string>('blue');
  selectedColor = this.defaultColor();

  setNewColor(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);
    this.selectedColor = inputElement.value;
    this.colorSelected.emit(inputElement.value);
  }

  // Method to programmatically set the current color
  setColor(color: string) {
    console.log('setColor-', color);
    this.selectedColor = color;
    this.colorSelected.emit(this.selectedColor); // Notify parent of the change
  }
}
