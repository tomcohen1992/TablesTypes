import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TableService } from '../shared/services/table.service';
import { PaginationService } from '../shared/services/pagination.service';
import { SearchService } from '../shared/services/search.service';
import { IUser } from '../shared/models/user.model';
import { PaginatorLimits, TableTypes } from '../shared/config/table.config';

@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationTableComponent implements OnInit, OnDestroy {
  data$: IUser[];
  state = TableTypes.Pagination;

  isFetchData$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  page = PaginatorLimits.firstPage;

  private isTableLoading$: Subject<boolean>;

  private destroyedSearch$ = new Subject();
  private destroyedPage$ = new Subject();

  private search = '';

  constructor(
    private tableService: TableService,
    private paginationService: PaginationService,
    private searchService: SearchService,
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.isTableLoading$ = this.tableService.isLoading$;

    this.fetchUsers();
    this.paginationService.page$.pipe(
      takeUntil(this.destroyedPage$)
    ).subscribe(page => {
      this.page = page;
      this.tableService.isLoading$.next(true);
      this.fetchUsers();
    });

    this.searchService.search$.pipe(
      takeUntil(this.destroyedSearch$)
    ).subscribe(search => {
      this.search = search;
      this.page = PaginatorLimits.firstPage;
      this.tableService.isLoading$.next(true);
      this.fetchUsers();
    });
  }

  ngOnDestroy(): void {
    this.destroyedPage$.unsubscribe();
    this.destroyedSearch$.unsubscribe();
  }

  private fetchUsers(): void {
    this.tableService.getUsers(this.page, this.search).subscribe(res => {
        this.data$ = res;
      },
      (error) => {
        console.log(error);
      }, () => {
        this.isFetchData$.next(true);
        this.ref.detectChanges();
      });
  }
}
