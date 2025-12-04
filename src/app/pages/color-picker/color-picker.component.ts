import { Component, ViewChild } from '@angular/core';
import { ColorSelectorComponent } from '../../components/color-picker/color-selector.component';
import { PreviewBoxComponent } from '../../components/color-picker/preview-box/preview-box.component';

/*
Allows users to select a color using the app-color-selector child component.
Displays a list of selected colors as app-preview-box components.
Provides functionality to reset the color picker to a default color and remove colors from the preview list.
*/
@Component({
  selector: 'app-color-picker',
  imports: [ColorSelectorComponent, PreviewBoxComponent],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  defaultColor = '#000000';
  selectedColor = this.defaultColor;

  pickedColors: string[] = [];
  @ViewChild(ColorSelectorComponent) colorSelector!: ColorSelectorComponent;

  onColorSelected(color: string) {
    this.selectedColor = color;
    console.log('ColorPickerComponent-', this.selectedColor);
  }

  resetColor() {
    if (this.colorSelector) {
      this.colorSelector.setColor(this.defaultColor); // Update child component
    }
  }

  addPreview() {
    this.pickedColors.push(this.selectedColor);
    console.log('Preview added with color:', this.selectedColor);
  }

  removePreview(index: number) {
    this.pickedColors.splice(index, 1); // Remove the color at the specified index
    console.log('Preview removed at index:', index);
  }
}
