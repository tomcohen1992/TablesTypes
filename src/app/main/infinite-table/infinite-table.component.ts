import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TableService } from '../shared/services/table.service';
import { PaginationService } from '../shared/services/pagination.service';
import { SearchService } from '../shared/services/search.service';
import { IUser } from '../shared/models/user.model';
import { PaginatorLimits, TableTypes } from '../shared/config/table.config';

@Component({
  selector: 'app-infinite-table',
  templateUrl: './infinite-table.component.html',
  styleUrls: ['./infinite-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteTableComponent implements OnInit, OnDestroy {
  isFetchData$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  data: IUser[] = [];
  state = TableTypes.Infinite;
  resetData = false;

  private destroyedSearch$ = new Subject();
  private destroyedPage$ = new Subject();

  private page = PaginatorLimits.firstPage;
  private search = '';


  constructor(
    private tableService: TableService,
    private paginationService: PaginationService,
    private searchService: SearchService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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
      this.resetData = true;
      this.tableService.isLoading$.next(true);
      this.fetchUsers();
    });

  }

  ngOnDestroy(): void {
    this.destroyedPage$.unsubscribe();
    this.destroyedSearch$.unsubscribe();
  }

  private fetchUsers(): void {
    this.tableService.getUsers(this.page, this.search).subscribe(newRows => {
      if (this.resetData) {
        this.data = newRows;
        this.resetData = false;

        return;
      }
      this.data = [...this.data, ...newRows];
    }, (err) => {
      console.log(err);
    }, () => {
      this.isFetchData$.next(true);
      this.ref.detectChanges();
    });
  }

}
