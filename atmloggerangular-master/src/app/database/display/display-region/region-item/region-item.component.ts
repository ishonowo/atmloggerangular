import { Component, Input } from '@angular/core';
import { Region } from 'src/app/model/region';

@Component({
  selector: 'app-region-item',
  templateUrl: './region-item.component.html',
  styleUrls: ['./region-item.component.css']
})
export class RegionItemComponent {
  @Input() region!: Region;
}