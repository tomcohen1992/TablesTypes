import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('filter', { static: true }) filter;

  private keyUpSub$: Subscription;

  constructor(
    private searchService: SearchService
  ) { }

  ngAfterViewInit(): void {
    this.keyUpSub$ = fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((event: Event) => (event.target as HTMLInputElement).value),
      ).subscribe(str => {
        this.searchService.search$.next(str);
      });
  }

  ngOnDestroy(): void {
    this.keyUpSub$.unsubscribe();
  }
}
