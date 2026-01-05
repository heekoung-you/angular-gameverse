import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  imports: [FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent {
  filterChanged = output<{ key: string; value: string }[]>();

  //type = model<string>('all'); // two-way binding signal
  //category = model<string>(''); // two-way binding signal
  type = 'all';
  category = '';

  performSearch(): void {
    const filterParam: { key: string; value: string }[] = [];
    if (this.type != 'all') {
      filterParam.push({ key: 'type', value: this.type });
    }
    if (this.category != '') {
      filterParam.push({ key: 'category', value: this.category });
    }
    this.filterChanged.emit(filterParam);
  }
}
