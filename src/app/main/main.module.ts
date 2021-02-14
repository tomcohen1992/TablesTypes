import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { InfiniteTableComponent } from './infinite-table/infinite-table.component';
import { PaginationTableComponent } from './pagination-table/pagination-table.component';
import { SearchComponent } from './shared/components/search/search.component';
import { TableComponent } from './shared/components/table/table.component';
import { PaginatorComponent } from './pagination-table/components/paginator/paginator.component';
import { TableService } from './shared/services/table.service';
import { SearchService } from './shared/services/search.service';
import { PaginationService } from './shared/services/pagination.service';
import { ApiService } from './shared/services/api.service';

@NgModule({
  declarations: [
    InfiniteTableComponent,
    PaginationTableComponent,
    SearchComponent,
    TableComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers: [
    TableService,
    SearchService,
    PaginationService,
    ApiService
  ]
})
export class MainModule { }
