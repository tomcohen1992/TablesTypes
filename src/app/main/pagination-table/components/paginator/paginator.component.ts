import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PaginationService } from '../../../shared/services/pagination.service';
import { PaginatorLimits } from 'src/app/main/shared/config/table.config';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  @Input() disabled: boolean;
  @Input() currentPage: number;

  PaginatorLimits = PaginatorLimits;

  constructor(
    private paginationService: PaginationService,
  ) { }

  pageChange(page: number): void{
    this.paginationService.page$.next(page);
  }
}
