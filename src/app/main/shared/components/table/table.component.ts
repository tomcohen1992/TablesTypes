import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit, Renderer2,
  SimpleChanges, ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';

import { PaginationService } from '../../services/pagination.service';
import { IUser } from '../../models/user.model';
import { PaginatorLimits, TableColumns, TableTypes } from '../../config/table.config';
import { TableService } from '../../services/table.service';
import { Animations } from '../../../animations/table.animation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    Animations.listAnimation
  ]
})
export class TableComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  TableColumns = TableColumns;
  TableTypes = TableTypes;

  isLoading$: Subject<boolean>;

  listenRenderer: any;
  isLock = false;

  @Input() dataSet: IUser[];
  @Input() state: TableTypes;

  displayedColumns: string[] = ['id', 'firstName', 'lastName'];
  @ViewChild('tableContainer') tableContainer: ElementRef<HTMLElement>;

  constructor(
    private paginationService: PaginationService,
    private ref: ChangeDetectorRef,
    private tableService: TableService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.tableService.isLoading$;
  }

  ngAfterViewInit(): void {
    if (this.state === this.TableTypes.Infinite) {
      this.listenRenderer = this.renderer.listen(this.tableContainer.nativeElement, 'scroll', (e) => {
        this.initScroller(e);
      });
    }
  }

  trackByFn(index, item): number {
    return item.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLock = false;
    this.tableService.isLoading$.next(false);
  }

  private initScroller(e): void {
    if (this.isLock) {
      return;
    }
    const offsetHeight = (e.target as HTMLInputElement).offsetHeight;
    const scrollTop = (e.target as HTMLInputElement).scrollTop;
    const scrollHeight = (e.target as HTMLInputElement).scrollHeight;

    const page = this.dataSet.length / PaginatorLimits.pageLimit + 1;

    if (offsetHeight + scrollTop + 25 >= scrollHeight && page < PaginatorLimits.lastPage + 1 && Number.isInteger(page)) {
      this.isLock = true;
      this.tableService.isLoading$.next(false);
      this.paginationService.page$.next(page);
    }
  }

  ngOnDestroy(): void {
    if (this.listenRenderer) {
      this.listenRenderer();
    }
  }
}
