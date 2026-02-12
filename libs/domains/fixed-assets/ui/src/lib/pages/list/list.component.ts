import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedAssetsService, FixedAsset } from '../../core/services/fixed-assets.service';

export interface AssetItem extends FixedAsset {
  // Add UI props
}

@Component({
  selector: 'virteex-fixed-assets-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private service = inject(FixedAssetsService);
  items: AssetItem[] = [];

  ngOnInit() {
    this.service.getAssets().subscribe((assets) => {
      this.items = assets;
    });
  }
}
