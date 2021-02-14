import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginationTableComponent } from './pagination-table/pagination-table.component';
import { InfiniteTableComponent } from './infinite-table/infinite-table.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'pagination',
    pathMatch: 'full',
  },
  {
    path: 'pagination',
    component: PaginationTableComponent,
    data: { title: 'pagination' }
  },
  {
    path: 'infinite',
    component: InfiniteTableComponent,
    data: { title: 'infinite' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
