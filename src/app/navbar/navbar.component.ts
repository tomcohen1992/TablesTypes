import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TableTypes } from '../main/shared/config/table.config';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  title$ = this.navbarService.title;
  TableTypes = TableTypes;
  paginationLabel = 'Pagination';
  infiniteLabel = 'Infinite';

  constructor(
    private navbarService: NavbarService,
  ) { }
}
